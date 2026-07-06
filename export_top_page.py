from playwright.sync_api import sync_playwright

url = "http://localhost:8787/index.html"
pdf_output = "central_top_page.pdf"
jpeg_output = "central_top_page.jpg"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(url, wait_until="networkidle", timeout=60000)

    # 画像・フォントの読み込みを待つ
    page.wait_for_timeout(5000)

    # ページ全体をスクロールして遅延読み込み画像を強制表示
    page.evaluate("""
        async () => {
            await new Promise(resolve => {
                let totalHeight = 0;
                const distance = 300;
                const timer = setInterval(() => {
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= document.body.scrollHeight) {
                        clearInterval(timer);
                        window.scrollTo(0, 0);
                        resolve();
                    }
                }, 150);
            });
        }
    """)

    # スクロール後さらに待機
    page.wait_for_timeout(3000)

    # ページの実際の高さを取得
    height = page.evaluate("document.body.scrollHeight")
    width = 1440

    # PDF書き出し
    page.pdf(
        path=pdf_output,
        width=f"{width}px",
        height=f"{height}px",
        print_background=True,
        margin={"top": "0", "bottom": "0", "left": "0", "right": "0"},
    )
    print(f"PDF保存完了: {pdf_output}")

    # JPEG書き出し（フルページ）
    page.set_viewport_size({"width": width, "height": height})
    page.wait_for_timeout(1000)
    page.screenshot(path=jpeg_output, type="jpeg", quality=90, full_page=True)
    print(f"JPEG保存完了: {jpeg_output}")

    browser.close()
