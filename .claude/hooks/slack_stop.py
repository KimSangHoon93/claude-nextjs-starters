#!/usr/bin/env python3
# 작업 완료 시 Slack 알림 전송
import sys
import json
import os
import re
import subprocess
import urllib.request
from pathlib import Path
from datetime import datetime


def load_env_file():
    # 프로젝트 .claude/.env 우선 → 없으면 전역 ~/.claude/.env 폴백
    candidates = [
        Path(__file__).parent.parent / '.env',
        Path.home() / '.claude' / '.env',
    ]
    for env_path in candidates:
        if env_path.exists():
            with open(env_path) as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        key, _, value = line.partition('=')
                        os.environ.setdefault(key.strip(), value.strip())
            break


def _clean_markdown(text):
    text = re.sub(r'```[\s\S]*?```', '', text)
    text = re.sub(r'`[^`]*`', '', text)
    text = re.sub(r'^#+\s*', '', text, flags=re.MULTILINE)
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    text = re.sub(r'__([^_]+)__', r'\1', text)
    text = re.sub(r'\*([^*]+)\*', r'\1', text)
    text = re.sub(r'_([^_]+)_', r'\1', text)
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    text = re.sub(r'^\s*[-*+]\s+', '', text, flags=re.MULTILINE)
    text = re.sub(r'^\s*\d+\.\s+', '', text, flags=re.MULTILINE)
    text = re.sub(r'^---+$', '', text, flags=re.MULTILINE)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def _extract_first_sentence(text):
    if not text:
        return None
    match = re.search(r'[.!?。？！]', text)
    if match and match.end() <= 120:
        sentence = text[:match.end()].strip()
    else:
        sentence = text[:100].strip()
        if len(text) > 100:
            sentence += '...'
    return sentence if sentence else None


def _summary_from_transcript(transcript_path):
    if not transcript_path:
        return None
    try:
        path = Path(transcript_path)
        if not path.exists():
            return None
        lines = path.read_text(encoding='utf-8').splitlines()
        for line in reversed(lines):
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                continue
            if obj.get('isSidechain') is True:
                continue
            if obj.get('type') != 'assistant':
                continue
            msg = obj.get('message', {})
            if msg.get('stop_reason') != 'end_turn':
                continue
            content = msg.get('content', [])
            if not isinstance(content, list):
                continue
            texts = [
                item['text']
                for item in content
                if isinstance(item, dict) and item.get('type') == 'text'
            ]
            if not texts:
                continue
            full_text = '\n'.join(texts)
            summary = _extract_first_sentence(_clean_markdown(full_text))
            if summary:
                return summary
        return None
    except Exception:
        return None


def _summary_from_git(project_root):
    try:
        result = subprocess.run(
            ['git', 'log', '-1', '--pretty=%s'],
            cwd=str(project_root),
            capture_output=True,
            text=True,
            encoding='utf-8',
            timeout=3
        )
        if result.returncode == 0:
            subject = result.stdout.strip()
            if subject:
                return subject
        return None
    except Exception:
        return None


def get_completion_summary(data, project_root):
    return (
        _summary_from_transcript(data.get('transcript_path'))
        or _summary_from_git(project_root)
        or 'Claude Code 작업이 완료되었습니다.'
    )


def main():
    load_env_file()

    try:
        data = json.loads(sys.stdin.buffer.read().decode('utf-8'))
    except Exception:
        sys.exit(0)

    # 무한 루프 방지: Stop 훅이 이미 활성화된 경우 즉시 종료
    if data.get('stop_hook_active'):
        sys.exit(0)

    webhook_url = os.environ.get('SLACK_WEBHOOK_URL', '')
    if not webhook_url:
        sys.exit(0)

    project_root = Path(__file__).parent.parent.parent
    project_name = project_root.name
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    summary = get_completion_summary(data, project_root)

    print(f"DEBUG: PROJECT_NAME = '{project_name}'", file=sys.stderr)
    print(f"DEBUG: TIMESTAMP = '{timestamp}'", file=sys.stderr)
    print(f"DEBUG: SUMMARY = '{summary}'", file=sys.stderr)

    text = (
        f"✅ 작업 완료 알림\n\n"
        f"프로젝트: {project_name}\n"
        f"시간: {timestamp}\n\n"
        f"{summary}"
    )

    payload = json.dumps({
        "channel": "#claude-code",
        "username": "Claude Code",
        "text": text,
        "icon_emoji": ":white_check_mark:"
    }).encode('utf-8')

    print(f"DEBUG: PAYLOAD = '{payload.decode()}'", file=sys.stderr)

    req = urllib.request.Request(
        webhook_url,
        data=payload,
        headers={'Content-Type': 'application/json'}
    )
    try:
        urllib.request.urlopen(req, timeout=5)
    except Exception as e:
        print(f"ERROR: Slack 전송 실패 - {e}", file=sys.stderr)


if __name__ == '__main__':
    main()
