#!/usr/bin/env python3
"""一键运行掌机风格贪吃蛇（启动本地静态服务器）。"""

from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import argparse
import pathlib
import webbrowser


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="运行掌机风格贪吃蛇")
    parser.add_argument("--host", default="127.0.0.1", help="监听地址，默认 127.0.0.1")
    parser.add_argument("--port", type=int, default=4173, help="监听端口，默认 4173")
    parser.add_argument(
        "--no-open",
        action="store_true",
        help="仅启动服务，不自动打开浏览器",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    repo_root = pathlib.Path(__file__).resolve().parent
    index_file = repo_root / "index.html"

    if not index_file.exists():
        raise SystemExit("未找到 index.html，请在项目根目录运行。")

    handler = SimpleHTTPRequestHandler
    httpd = ThreadingHTTPServer((args.host, args.port), handler)
    url = f"http://{args.host}:{args.port}/index.html"

    print("掌机风格贪吃蛇已就绪：")
    print(f"  {url}")
    print("按 Ctrl+C 退出。")

    if not args.no_open:
        webbrowser.open(url)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n已停止。")


if __name__ == "__main__":
    main()
