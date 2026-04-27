#!/usr/bin/env python3
# 권한 요청 시 Slack 알림 전송
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

    webhook_url = os.environ.get('SLACK_WEBHOOK_URL', '')
    if not webhook_url:
        sys.exit(0)

    project_name = Path(__file__).parent.parent.parent.name.upper()

    # tool_name 우선, 없으면 message에서 첫 줄 사용
    tool_name = data.get('tool_name', '')
    message = data.get('message', '')
    detail = f"`{tool_name}` 도구" if tool_name else message.splitlines()[0][:100] if message else '알 수 없음'

    text = f":warning: *{project_name} 권한 요청* => {detail}"

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
