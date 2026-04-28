#!/usr/bin/env python3
# 작업 완료 시 Slack 알림 전송
import sys
import json
import os
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

    project_name = Path(__file__).parent.parent.parent.name

    reason = data.get('hook_event_name', '')
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    print(f"DEBUG: REASON = '{reason}'", file=sys.stderr)
    print(f"DEBUG: PROJECT_NAME = '{project_name}'", file=sys.stderr)
    print(f"DEBUG: TIMESTAMP = '{timestamp}'", file=sys.stderr)

    text = (
        f"✅ 작업 완료 알림\n\n"
        f"프로젝트: {project_name}\n"
        f"상태: {reason}\n"
        f"시간: {timestamp}\n\n"
        f"Claude Code 작업이 완료되었습니다."
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
    except Exception:
        pass


if __name__ == '__main__':
    main()
