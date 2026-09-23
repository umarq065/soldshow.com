import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Desktop 1440x900 viewport
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3000/", wait_until="load")
        await page.wait_for_timeout(1500)

        out_dir = r"C:\Users\ms\.gemini\antigravity-ide\brain\869a0f8a-34ed-4ddf-b246-79b6d8bd1390"
        
        # 1. Hero
        await page.screenshot(path=os.path.join(out_dir, "our_sec1_hero.png"))
        print("Captured 1: Hero")

        # 2. Scroll to #system (Stat cards)
        await page.locator("#system").scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)
        await page.screenshot(path=os.path.join(out_dir, "our_sec2_stats.png"))
        print("Captured 2: Stats")

        # 3. Scroll to #dashboard (Tab 1 active)
        await page.locator("#dashboard").scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)
        await page.screenshot(path=os.path.join(out_dir, "our_sec3_dashboard_tab1.png"))
        print("Captured 3: Dashboard Tab 1")

        # 4. Click Tab 2 on dashboard ("Everything's on track")
        tab2 = page.locator(".numa-accordion-item").nth(1)
        if await tab2.count() > 0:
            await tab2.click()
            await page.wait_for_timeout(800)
            await page.screenshot(path=os.path.join(out_dir, "our_sec3_dashboard_tab2.png"))
            print("Captured 4: Dashboard Tab 2")

        # 5. Scroll to #timeline (Wave Curve)
        await page.locator("#timeline").scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)
        await page.screenshot(path=os.path.join(out_dir, "our_sec4_timeline.png"))
        print("Captured 5: Timeline Wave Curve")

        # 6. Scroll to #how-it-works (Steps)
        await page.locator("#how-it-works").scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)
        await page.screenshot(path=os.path.join(out_dir, "our_sec5_steps.png"))
        print("Captured 6: Steps")

        await browser.close()
        print("Done capturing all sections!")

asyncio.run(main())
