#!/usr/bin/env python3
# 작업 완료 시 Slack 알림 전송
import sys
import json
import os
import urllib.request
from pathlib import Path


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

    project_name = Path(__file__).parent.parent.parent.name.upper()

    # 마크다운 기호 제거 후 첫 문장 추출
    import re
    raw = data.get('last_assistant_message', '')
    clean = re.sub(r'[#*`>_\[\]()]', '', raw).strip()
    summary = next((l.strip() for l in clean.splitlines() if l.strip()), '작업 완료')[:100]

    text = f":white_check_mark: *{project_name} 작업 완료* => {summary}"

    payload = json.dumps({"text": text}).encode('utf-8')
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
