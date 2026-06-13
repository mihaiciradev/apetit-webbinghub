// Standalone "APETIT in a nutshell" presentation page.
//
// This is a Route Handler (not a page), so it sidesteps the app's `[locale]`
// layout, fonts and Tailwind entirely — the HTML below renders exactly as
// authored, visually distinct from the marketing site. It is intentionally
// NOT in the sitemap and is blocked from crawlers (robots.txt disallow +
// X-Robots-Tag header + a noindex <meta>) so it can be shared privately with
// prospective buyers without being indexed.
//
// The proxy (`proxy.ts`) excludes `/nutshell` from locale redirects, so it is
// reachable at the bare /nutshell path with no language prefix — the page
// handles its own EN/RO switching.

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow, noarchive, noimageindex">
    <title>APETIT by WebbingHUB</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: white;
            color: #1c1917;
            padding: 0;
            line-height: 1.6;
        }

        .container {
            max-width: 100%;
            margin: 0 auto;
            background: white;
            border-radius: 0;
            box-shadow: none;
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #f9f7f5 0%, #f0ebe5 100%);
            padding: 40px 40px;
            position: relative;
            border-bottom: 1px solid #e0d5cc;
        }

        .header-content {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo-section {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .logo-icon {
            width: 48px;
            height: 48px;
            flex-shrink: 0;
        }

        .logo-icon svg {
            width: 100%;
            height: 100%;
            color: #1c3a2a;
        }

        .logo-text h1 {
            font-size: 32px;
            font-weight: 700;
            margin: 0;
            padding: 0;
            color: #1c3a2a;
            letter-spacing: -0.5px;
            line-height: 1;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .logo-text p {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 1.8px;
            text-transform: uppercase;
            color: #9b8977;
            margin: 4px 0 0 0;
            padding: 0;
        }

        .header-links {
            position: absolute;
            top: 20px;
            right: 200px;
            font-size: 13px;
        }

        .header-links a {
            color: #3d6b4f;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .header-links a:hover {
            color: #1c3a2a;
            text-decoration: underline;
        }

        .lang-btn {
            padding: 8px 14px;
            border: 2px solid #d5ccba;
            background: transparent;
            color: #3d6b4f;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .lang-btn.active {
            background: #3d6b4f;
            border-color: #3d6b4f;
            color: white;
        }

        .lang-btn:hover {
            border-color: #3d6b4f;
        }

        .header .tagline {
            font-size: 16px;
            color: #666;
        }

        .content {
            padding: 50px 40px;
            max-width: 1400px;
            margin: 0 auto;
        }

        .section {
            margin-bottom: 60px;
        }

        .section-title {
            font-size: 24px;
            color: #3d6b4f;
            margin-bottom: 30px;
            padding-bottom: 12px;
            border-bottom: 3px solid #b8975a;
            display: inline-block;
            font-weight: 700;
        }

        .intro-text {
            font-size: 15px;
            color: #555;
            margin-bottom: 30px;
            line-height: 1.7;
        }

        .modules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-bottom: 30px;
        }

        .section:first-of-type .modules-grid {
            max-width: 100%;
        }

        .module-card {
            background: linear-gradient(135deg, #f9f7f5 0%, #f0ebe5 100%);
            border: 2px solid #e0d5cc;
            border-radius: 10px;
            padding: 30px;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 1;
        }

        /* MODULE 1 specific - narrower */
        .section:has(.module-card:only-child) .modules-grid {
            grid-template-columns: 1fr;
            max-width: 50%;
            position: relative;
        }

        .section:has(.module-card:only-child) {
            position: relative;
            overflow: hidden;
        }

        .section:has(.module-card:only-child)::after {
            content: '';
            position: absolute;
            right: -150px;
            top: 50%;
            transform: translateY(-50%);
            width: 500px;
            height: 500px;
            background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 4.6c1-.7 1-1.7 0-2.4M16 4.2c1-.7 1-1.7 0-2.4M19 4.6c1-.7 1-1.7 0-2.4" stroke="%233d6b4f" stroke-width="1.3" stroke-linecap="round" opacity="0.45"/><circle cx="16" cy="7.4" r="1.5" fill="%233d6b4f"/><path d="M16 8.9v2.1" stroke="%233d6b4f" stroke-width="1.7" stroke-linecap="round"/><path d="M5.5 22.4C5.5 15.6 10 11 16 11s10.5 4.6 10.5 11.4" stroke="%233d6b4f" stroke-width="1.7" stroke-linecap="round"/><path d="M9.6 21.4c.3-4.1 3-7.1 6-7.3" stroke="%233d6b4f" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/><path d="M3.6 22.6h24.8" stroke="%233d6b4f" stroke-width="1.7" stroke-linecap="round"/><path d="M6.6 25.6h18.8" stroke="%233d6b4f" stroke-width="1.7" stroke-linecap="round" opacity="0.45"/></svg>');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            opacity: 0.06;
            z-index: 0;
            pointer-events: none;
        }

        .module-card.with-logo::after {
            content: '';
            position: absolute;
            right: 30px;
            bottom: 30px;
            width: 120px;
            height: 120px;
            opacity: 0.1;
            background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 4.6c1-.7 1-1.7 0-2.4M16 4.2c1-.7 1-1.7 0-2.4M19 4.6c1-.7 1-1.7 0-2.4" stroke="%231c3a2a" stroke-width="1.3" stroke-linecap="round" opacity="0.45"/><circle cx="16" cy="7.4" r="1.5" fill="%231c3a2a"/><path d="M16 8.9v2.1" stroke="%231c3a2a" stroke-width="1.7" stroke-linecap="round"/><path d="M5.5 22.4C5.5 15.6 10 11 16 11s10.5 4.6 10.5 11.4" stroke="%231c3a2a" stroke-width="1.7" stroke-linecap="round"/><path d="M9.6 21.4c.3-4.1 3-7.1 6-7.3" stroke="%231c3a2a" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/><path d="M3.6 22.6h24.8" stroke="%231c3a2a" stroke-width="1.7" stroke-linecap="round"/><path d="M6.6 25.6h18.8" stroke="%231c3a2a" stroke-width="1.7" stroke-linecap="round" opacity="0.45"/></svg>');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            pointer-events: none;
        }

        .module-card:hover {
            box-shadow: 0 12px 28px rgba(0,0,0,0.12);
            transform: translateY(-4px);
            border-color: #b8975a;
        }

        .module-card h3 {
            color: #3d6b4f;
            margin-bottom: 20px;
            font-size: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 700;
        }

        .module-card .label {
            background: #3d6b4f;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            margin-left: auto;
            flex-shrink: 0;
        }

        .module-card ul {
            list-style: none;
        }

        .module-card li {
            padding: 10px 0;
            padding-left: 25px;
            position: relative;
            font-size: 15px;
            color: #333;
        }

        .module-card li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #3d6b4f;
            font-weight: bold;
        }

        .module-card .note {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid rgba(0,0,0,0.1);
            font-size: 13px;
            color: #666;
            font-style: italic;
        }

        .module-card .subtext {
            font-size: 12px;
            color: #999;
            font-style: italic;
            margin-top: 8px;
            margin-left: 25px;
            padding-left: 8px;
            padding-top: 5px;
            display: block;
            margin-bottom: 0;
        }

        /* Annotation lines aren't list items — no checkmark. */
        .module-card li.subtext:before {
            content: none;
        }

        .btn-group {
            display: flex;
            gap: 10px;
            margin-top: 12px;
            flex-wrap: wrap;
        }

        .btn-small {
            padding: 6px 12px;
            background: #f0ebe5;
            border: 1px solid #d5ccba;
            border-radius: 6px;
            font-size: 12px;
            color: #3d6b4f;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s ease;
        }

        .btn-small:hover {
            background: #e0d5cc;
            border-color: #b8975a;
        }

        .feature-section {
            background: linear-gradient(135deg, #f5f3f0 0%, #ede7df 100%);
            border-left: 5px solid #3d6b4f;
            padding: 30px;
            border-radius: 8px;
            margin-bottom: 30px;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }

        .feature-item {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #b8975a;
        }

        .feature-item h5 {
            color: #3d6b4f;
            margin-bottom: 10px;
            font-size: 15px;
            font-weight: 700;
        }

        .feature-item p {
            font-size: 13px;
            color: #666;
            line-height: 1.5;
        }

        .pricing-section {
            background: linear-gradient(135deg, #f5f3f0 0%, #ede7df 100%);
            padding: 40px;
            border-radius: 10px;
            margin-bottom: 30px;
        }

        .pricing-intro {
            text-align: center;
            margin-bottom: 40px;
        }

        .pricing-intro h3 {
            color: #3d6b4f;
            font-size: 20px;
            margin-bottom: 15px;
        }

        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
        }

        .pricing-card {
            background: white;
            border: 2px solid #e0d5cc;
            border-radius: 10px;
            padding: 30px;
            transition: all 0.3s ease;
        }

        .pricing-card:hover {
            box-shadow: 0 12px 28px rgba(0,0,0,0.15);
            border-color: #b8975a;
            transform: translateY(-4px);
        }

        .pricing-card.featured {
            border: 2px solid #b8975a;
            background: linear-gradient(135deg, #fff5f0 0%, #ffe8de 100%);
        }

        .pricing-card .badge {
            background: #b8975a;
            color: white;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 15px;
        }

        .pricing-card h4 {
            color: #3d6b4f;
            font-size: 20px;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .price-display {
            margin-bottom: 25px;
        }

        .price-display .amount {
            font-size: 36px;
            color: #3d6b4f;
            font-weight: 700;
            margin-bottom: 5px;
        }

        .price-display .period {
            font-size: 12px;
            color: #999;
        }

        .pricing-card ul {
            list-style: none;
            margin-bottom: 25px;
        }

        .pricing-card li {
            padding: 10px 0;
            padding-left: 25px;
            position: relative;
            font-size: 14px;
            color: #555;
        }

        .pricing-card li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #3d6b4f;
            font-weight: bold;
        }

        /* Shared "everything included" block above the price cards. */
        .pricing-included {
            background: white;
            border: 2px solid #e0d5cc;
            border-radius: 10px;
            padding: 28px 30px;
            margin-bottom: 35px;
        }

        .pricing-included h4 {
            color: #3d6b4f;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 18px;
            text-align: center;
        }

        .included-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 14px 28px;
        }

        .included-grid span {
            display: block;
            padding-left: 26px;
            position: relative;
            font-size: 14px;
            color: #444;
            line-height: 1.5;
            /* Reserve two lines so wrapping items stay aligned with the rest,
               keeping rows tidy in every language. */
            min-height: 42px;
        }

        .included-grid span:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #3d6b4f;
            font-weight: bold;
        }

        /* Compact price cards — payment method only, no repeated feature list. */
        .pricing-grid.compact {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            max-width: 680px;
            margin: 0 auto;
            gap: 24px;
        }

        .pricing-grid.compact .pricing-card {
            padding: 24px;
            text-align: center;
        }

        .pricing-grid.compact .price-display {
            margin-bottom: 0;
        }

        .pricing-note {
            text-align: center;
            font-size: 13px;
            color: #666;
            font-style: italic;
            margin: 28px auto 0 auto;
            max-width: 640px;
            line-height: 1.6;
        }

        .data-section {
            background: linear-gradient(135deg, #f5f3f0 0%, #ede7df 100%);
            border-left: 5px solid #3d6b4f;
            padding: 30px;
            border-radius: 8px;
            margin-bottom: 30px;
        }

        .data-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }

        .data-item {
            background: white;
            padding: 18px;
            border-radius: 8px;
            border-left: 4px solid #b8975a;
        }

        .data-item h5 {
            color: #3d6b4f;
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: 700;
        }

        .data-item p {
            font-size: 13px;
            color: #666;
            line-height: 1.5;
        }

        .footnote {
            background: #f5f3f0;
            padding: 20px;
            border-radius: 8px;
            font-size: 12px;
            color: #666;
            line-height: 1.6;
            margin-top: 20px;
        }

        .footnote strong {
            color: #3d6b4f;
        }

        .footer {
            background: #f9f7f5;
            padding: 30px 40px;
            border-top: 1px solid #e0d5cc;
            text-align: center;
            font-size: 13px;
            color: #999;
        }

        @media (max-width: 768px) {
            .section:has(.module-card:only-child) .modules-grid {
                max-width: 100%;
            }

            .section:has(.module-card:only-child)::after {
                width: 300px;
                height: 300px;
                right: -100px;
            }

            .modules-grid.with-logo-side {
                flex-direction: column;
                gap: 20px;
            }

            .modules-grid.with-logo-side .module-card {
                min-width: auto;
            }

            .logo-decoration {
                width: 100%;
                height: 150px;
            }

            .logo-decoration svg {
                width: 100px;
                height: 100px;
            }

            .header-links {
                position: static;
                display: block;
                text-align: center;
                margin-bottom: 20px;
                right: auto;
            }

            .header h1 {
                font-size: 32px;
            }

            .header-content {
                flex-direction: column;
                align-items: flex-start;
                gap: 20px;
            }

            .language-switcher {
                position: absolute;
                top: 20px;
                right: 20px;
            }

            .header {
                padding: 50px 20px 30px 20px;
            }

            .header .tagline {
                text-align: center;
                width: 100%;
                margin-top: 20px;
            }

            .modules-grid {
                grid-template-columns: 1fr;
            }

            .pricing-grid {
                grid-template-columns: 1fr;
            }
        }

        .soon {
            display: inline-block;
            background: #b8975a;
            color: #fff;
            padding: 2px 9px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            vertical-align: middle;
            margin-left: 4px;
            white-space: nowrap;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="header-links">
                <a href="https://apetit.webbinghub.io" target="_blank" rel="noopener noreferrer">apetit.webbinghub.io</a>
            </div>
            <div class="header-content">
                <div class="logo-section">
                    <div class="logo-icon">
                        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <!-- rising steam — fresh, just served -->
                            <path d="M13 4.6c1-.7 1-1.7 0-2.4M16 4.2c1-.7 1-1.7 0-2.4M19 4.6c1-.7 1-1.7 0-2.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity="0.45"/>
                            <!-- knob -->
                            <circle cx="16" cy="7.4" r="1.5" fill="currentColor"/>
                            <path d="M16 8.9v2.1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
                            <!-- cloche dome -->
                            <path d="M5.5 22.4C5.5 15.6 10 11 16 11s10.5 4.6 10.5 11.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
                            <!-- inner sheen for depth -->
                            <path d="M9.6 21.4c.3-4.1 3-7.1 6-7.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity="0.4"/>
                            <!-- plate -->
                            <path d="M3.6 22.6h24.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
                            <path d="M6.6 25.6h18.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" opacity="0.45"/>
                        </svg>
                    </div>
                    <div class="logo-text">
                        <h1>APETIT</h1>
                        <p>by WebbingHUB</p>
                    </div>
                </div>
                <div class="language-switcher">
                    <button class="lang-btn active" onclick="switchLanguage('en')">EN</button>
                    <button class="lang-btn" onclick="switchLanguage('ro')">RO</button>
                </div>
            </div>
            <p class="tagline" data-en="Digital Platform for Restaurants, Cafés & Terraces" data-ro="Platformă Digitală pentru Restaurante, Cafenele & Terase">Digital Platform for Restaurants, Cafés & Terraces</p>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- 1. HERO -->
            <div class="section">
                <h2 class="section-title" data-en="The tables take their own orders." data-ro="Mesele își iau singure comanda.">The tables take their own orders.</h2>
                <p class="intro-text" data-en="Guests scan the QR code on the table, order from their phone, and the order appears in the kitchen instantly. One waiter covers more tables a shift — no notepad, no extra trips, no orders shouted across the room." data-ro="Oaspeții scanează codul QR de pe masă, comandă de pe telefon, iar comanda apare instant în bucătărie. Un ospătar acoperă mai multe mese pe tură — fără carnețel, fără drumuri în plus, fără comenzi strigate." style="font-weight: 600; color: #2e5239;">Guests scan the QR code on the table, order from their phone, and the order appears in the kitchen instantly. One waiter covers more tables a shift — no notepad, no extra trips, no orders shouted across the room.</p>
                <p class="intro-text" style="margin-bottom: 0;" data-en="No delivery app sits between you and your guest taking a cut. The orders, the data, and the guest relationship all stay yours." data-ro="Nicio aplicație de livrare nu stă între tine și oaspete ca să-ți ia o parte din încasări. Comenzile, datele și relația cu oaspetele rămân ale tale.">No delivery app sits between you and your guest taking a cut. The orders, the data, and the guest relationship all stay yours.</p>
            </div>

            <!-- 2. HOW IT WORKS -->
            <div class="section">
                <h2 class="section-title" data-en="How it works" data-ro="Cum funcționează">How it works</h2>
                <div class="feature-section">
                    <div class="features-grid">
                        <div class="feature-item">
                            <h5 data-en="1. Scan" data-ro="1. Scanează">1. Scan</h5>
                            <p data-en="The guest scans the QR code on the table and sees your menu — photos, prices, allergens. Nothing to install." data-ro="Oaspetele scanează codul QR de pe masă și vede meniul tău — poze, prețuri, alergeni. Fără nicio aplicație de instalat.">The guest scans the QR code on the table and sees your menu — photos, prices, allergens. Nothing to install.</p>
                        </div>
                        <div class="feature-item">
                            <h5 data-en="2. Order" data-ro="2. Comandă">2. Order</h5>
                            <p data-en="They order from their phone. The order appears instantly on the kitchen and bar screens, with the table number." data-ro="Comandă de pe telefon. Comanda apare instant pe ecranul din bucătărie și la bar, cu numărul mesei.">They order from their phone. The order appears instantly on the kitchen and bar screens, with the table number.</p>
                        </div>
                        <div class="feature-item">
                            <h5 data-en="3. Serve" data-ro="3. Servește">3. Serve</h5>
                            <p data-en="The kitchen marks it 'ready', the waiter is alerted and brings the plate. The guest asks for the bill from the phone too." data-ro="Bucătăria marchează 'gata', ospătarul e anunțat și duce farfuria. Oaspetele cere nota tot de pe telefon.">The kitchen marks it 'ready', the waiter is alerted and brings the plate. The guest asks for the bill from the phone too.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. ORDERS AT THE TABLE + KITCHEN SCREEN -->
            <div class="section">
                <h2 class="section-title" data-en="Orders at the table & the kitchen screen" data-ro="Comenzi la masă & ecranul din bucătărie">Orders at the table & the kitchen screen</h2>

                <div class="modules-grid">
                    <div class="module-card">
                        <h3>
                            <span data-en="👨‍🍳 The kitchen & bar screen" data-ro="👨‍🍳 Ecranul din bucătărie & bar">👨‍🍳 The kitchen & bar screen</span>
                        </h3>
                        <ul>
                            <li data-en="Color-coded by wait time, so late tickets stand out at a glance" data-ro="Codate pe culori după timpul de așteptare, ca tichetele întârziate să iasă imediat în evidență">Color-coded by wait time, so late tickets stand out at a glance</li>
                            <li data-en="Orders on screens, not on paper" data-ro="Comenzi pe ecrane, nu pe hârtie">Orders on screens, not on paper</li>
                            <li data-en="Every ticket shows the table, the items, and the wait time" data-ro="Fiecare tichet arată masa, produsele și timpul de așteptare">Every ticket shows the table, the items, and the wait time</li>
                            <li data-en="Mark a ticket ready and the waiter is alerted at once" data-ro="Marchezi un tichet ca gata și ospătarul e anunțat pe loc">Mark a ticket ready and the waiter is alerted at once</li>
                            <li data-en="The bar runs its own queue alongside the kitchen" data-ro="Barul își ține propria coadă, alături de bucătărie">The bar runs its own queue alongside the kitchen</li>
                        </ul>
                        <p class="note" data-en="Customizable to how your restaurant actually works." data-ro="Personalizabil după felul în care funcționează de fapt restaurantul tău.">Customizable to how your restaurant actually works.</p>
                    </div>

                    <div class="module-card">
                        <h3>
                            <span data-en="📋 Ordering at the table" data-ro="📋 Comanda la masă">📋 Ordering at the table</span>
                        </h3>
                        <ul>
                            <li data-en="Scan the QR on the table → instant menu, by category" data-ro="Scanează codul QR de pe masă → meniu instant, pe categorii">Scan the QR on the table → instant menu, by category</li>
                            <li data-en="Photos, descriptions and prices for every dish" data-ro="Poze, descrieri și prețuri pentru fiecare preparat">Photos, descriptions and prices for every dish</li>
                            <li data-en="Add to cart, adjust quantities, reorder in a tap" data-ro="Adaugă la coș, ajustează cantități, recomandă cu o atingere">Add to cart, adjust quantities, reorder in a tap</li>
                            <li data-en="Filter by dietary needs (vegan, allergies)" data-ro="Filtrează după nevoi dietetice (vegan, alergii)">Filter by dietary needs (vegan, allergies)</li>
                            <li data-en="Sold-out items are flagged (86) and hidden the moment you run out" data-ro="Produsele epuizate sunt marcate (86) și ascunse în clipa în care se termină">Sold-out items are flagged (86) and hidden the moment you run out</li>
                            <li data-en="The waiter can edit an order — add, remove, adjust on the spot" data-ro="Ospătarul poate edita o comandă — adaugă, scoate, ajustează pe loc">The waiter can edit an order — add, remove, adjust on the spot</li>
                            <li data-en="Call the waiter with one tap; staff get the table number" data-ro="Cheamă chelnerul cu o atingere; personalul primește numărul mesei">Call the waiter with one tap; staff get the table number</li>
                            <li data-en="Choose dine-in or takeaway" data-ro="Alege: la local sau la pachet">Choose dine-in or takeaway</li>
                            <li data-en="Ask for the bill and pay at the table by cash or card" data-ro="Cere nota și plătește la masă cu numerar sau card">Ask for the bill and pay at the table by cash or card</li>
                        </ul>
                        <p class="note" data-en="No app to download. Guests scan, order, call the waiter, and ask for the bill, all from the table." data-ro="Fără aplicație de descărcat. Oaspeții scanează, comandă, cheamă chelnerul și cer nota, totul de la masă.">No app to download. Guests scan, order, call the waiter, and ask for the bill, all from the table.</p>
                    </div>
                </div>
            </div>

            <!-- 4. FOR YOUR TEAM -->
            <div class="section">
                <h2 class="section-title" data-en="Your team will love it (yes, the waiters too)" data-ro="Echipa ta o să o iubească (da, și ospătarii)">Your team will love it (yes, the waiters too)</h2>
                <div class="feature-section">
                    <div class="features-grid">
                        <div class="feature-item">
                            <h5 data-en="🏃 Less running for the floor" data-ro="🏃 Mai puțină alergătură în sală">🏃 Less running for the floor</h5>
                            <p data-en="Waiters stop running to take orders — they carry plates and cash out. Fewer trips, the same tips, more tables served." data-ro="Ospătarii nu mai aleargă să ia comenzi — cară farfurii și încasează. Mai puține drumuri, aceleași bacșișuri, mai multe mese servite.">Waiters stop running to take orders — they carry plates and cash out. Fewer trips, the same tips, more tables served.</p>
                        </div>
                        <div class="feature-item">
                            <h5 data-en="🍳 A calmer kitchen" data-ro="🍳 O bucătărie mai liniștită">🍳 A calmer kitchen</h5>
                            <p data-en="No more deciphering handwriting on a notepad and no more shouting for waiters. Tickets are clear, with table, items and notes." data-ro="Bucătăria nu mai descifrează scrisul de pe carnețel și nu mai strigă după ospătari. Tichetele sunt clare, cu masă, produse și note.">No more deciphering handwriting on a notepad and no more shouting for waiters. Tickets are clear, with table, items and notes.</p>
                        </div>
                        <div class="feature-item">
                            <h5 data-en="🤝 We train your people in person" data-ro="🤝 Instruim oamenii tăi în persoană">🤝 We train your people in person</h5>
                            <p data-en="At onboarding we come to your venue and train every waiter and cook ourselves. You don't get a PDF manual — you get a person at the table." data-ro="La onboarding venim în local și instruim personal fiecare ospătar și bucătar. Nu primești un manual PDF — primești un om la masă.">At onboarding we come to your venue and train every waiter and cook ourselves. You don't get a PDF manual — you get a person at the table.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 5. RESERVATIONS & REVIEWS -->
            <div class="section">
                <h2 class="section-title" data-en="Reservations & reviews" data-ro="Rezervări & recenzii">Reservations & reviews</h2>
                <div class="modules-grid">
                    <div class="module-card">
                        <h3>
                            <span data-en="📅 Reservations" data-ro="📅 Rezervări">📅 Reservations</span>
                        </h3>
                        <ul>
                            <li data-en="Guests pick date, time and party size from their phone" data-ro="Oaspeții aleg data, ora și mărimea grupului de pe telefon">Guests pick date, time and party size from their phone</li>
                            <li data-en="Instant email confirmation" data-ro="Confirmare pe email instant">Instant email confirmation</li>
                            <li data-en="Self-service: guests modify or cancel on their own" data-ro="Self-service: oaspeții modifică sau anulează singuri">Self-service: guests modify or cancel on their own</li>
                            <li data-en="Auto-accept bookings, or review them first — your call" data-ro="Acceptare automată a rezervărilor sau verificare întâi — tu decizi">Auto-accept bookings, or review them first — your call</li>
                            <li data-en="Entrance QR code turns walk-ins into bookings for later" data-ro="Codul QR de la intrare transformă vizitatorii spontani în rezervări pentru altă dată">Entrance QR code turns walk-ins into bookings for later</li>
                        </ul>
                    </div>
                    <div class="module-card">
                        <h3>
                            <span data-en="⭐ Reviews" data-ro="⭐ Recenzii">⭐ Reviews</span>
                        </h3>
                        <ul>
                            <li data-en="Guests rate dishes and leave feedback after they eat" data-ro="Oaspeții evaluează preparatele și lasă feedback după ce mănâncă">Guests rate dishes and leave feedback after they eat</li>
                            <li data-en="Separate scores for food, service and staff" data-ro="Note separate pentru mâncare, serviciu și personal">Separate scores for food, service and staff</li>
                            <li data-en="Earn a discount code for a relevant review, valid on the next order" data-ro="Câștigă un cod de reducere pentru o recenzie relevantă, valabil la comanda următoare">Earn a discount code for a relevant review, valid on the next order</li>
                            <li data-en="Feedback is private — for your staff only, not public" data-ro="Feedback-ul e privat — doar pentru staff-ul tău, nu public">Feedback is private — for your staff only, not public</li>
                            <li><span data-en="After a review, happy guests get a direct link to your Google page, so the good reviews land where they count." data-ro="După recenzie, oaspeții mulțumiți primesc link direct către pagina ta de Google, ca recenziile bune să ajungă unde contează.">After a review, happy guests get a direct link to your Google page, so the good reviews land where they count.</span> <span class="soon" data-en="coming soon" data-ro="în curând">în curând</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- 6. THE GUEST STAYS YOURS -->
            <div class="section">
                <h2 class="section-title" data-en="Every order builds YOUR own guest list" data-ro="Fiecare comandă îți construiește lista TA de clienți">Every order builds YOUR own guest list</h2>
                <div class="feature-section">
                    <div class="features-grid">
                        <div class="feature-item">
                            <h5 data-en="📇 Your list, not someone else's" data-ro="📇 Lista ta, nu a altcuiva">📇 Your list, not someone else's</h5>
                            <p data-en="Every order adds the guest to your own list. You know who comes back, and the relationship is yours to keep." data-ro="Fiecare comandă adaugă oaspetele pe lista ta. Știi cine revine, iar relația rămâne a ta.">Every order adds the guest to your own list. You know who comes back, and the relationship is yours to keep.</p>
                        </div>
                        <div class="feature-item">
                            <h5 data-en="🎟️ Vouchers that bring them back" data-ro="🎟️ Vouchere care îi aduc înapoi">🎟️ Vouchers that bring them back</h5>
                            <p data-en="Send a voucher after a visit and turn one meal into the next. They come back to you, not to an app." data-ro="Trimiți un voucher după vizită și transformi o masă în următoarea. Revin la tine, nu la o aplicație.">Send a voucher after a visit and turn one meal into the next. They come back to you, not to an app.</p>
                        </div>
                        <div class="feature-item">
                            <h5 data-en="🚫 No middleman" data-ro="🚫 Fără intermediar">🚫 No middleman</h5>
                            <p data-en="No third party between you and your guest, taking a cut and keeping the data. It's just you and the people you feed." data-ro="Niciun terț între tine și oaspete, care să ia o parte din încasări și să păstreze datele. Doar tu și oamenii pe care îi hrănești.">No third party between you and your guest, taking a cut and keeping the data. It's just you and the people you feed.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 7. FITS WHAT YOU ALREADY HAVE -->
            <div class="section">
                <h2 class="section-title" data-en="You change nothing you already have. APETIT adds on, it doesn't replace." data-ro="Nu schimbi nimic din ce ai. APETIT se adaugă, nu înlocuiește.">You change nothing you already have. APETIT adds on, it doesn't replace.</h2>
                <div class="feature-section">
                    <p class="intro-text" style="margin-bottom: 14px;" data-en="Your cash register and POS stay exactly where they are. APETIT replaces the notepad and the shouting between the floor and the kitchen — the fiscal receipt is issued the same way it always was, in a few seconds." data-ro="Casa de marcat și POS-ul tău rămân exact unde sunt. APETIT înlocuiește carnețelul și strigătele dintre sală și bucătărie — bonul fiscal se emite ca până acum, în câteva secunde.">Your cash register and POS stay exactly where they are. APETIT replaces the notepad and the shouting between the floor and the kitchen — the fiscal receipt is issued the same way it always was, in a few seconds.</p>
                    <p class="intro-text" style="margin-bottom: 0;"><span data-en="We're working on direct integrations with the POS systems used in Romania, so the steps shrink even further." data-ro="Lucrăm la integrări directe cu sistemele POS folosite în România, ca pașii să se reducă și mai mult.">We're working on direct integrations with the POS systems used in Romania, so the steps shrink even further.</span> <span class="soon" data-en="in progress" data-ro="în lucru">în lucru</span></p>
                </div>
            </div>

            <!-- 8. WHAT WE DO FOR YOU -->
            <div class="section">
                <h2 class="section-title" data-en="What we do for you" data-ro="Ce facem noi pentru tine">What we do for you</h2>
                <p class="intro-text" data-en="This is the part no self-serve QR tool gives you: a local team, in person, in Romanian." data-ro="Asta e partea pe care niciun instrument QR self-service nu ți-o dă: o echipă locală, în persoană, în română." style="font-weight: 600; color: #2e5239;">This is the part no self-serve QR tool gives you: a local team, in person, in Romanian.</p>
                <div class="feature-section">
                    <div class="features-grid">
                        <div class="feature-item">
                            <h5 data-en="🔗 Unique QR codes, print-ready" data-ro="🔗 Coduri QR unice, gata de tipar">🔗 Unique QR codes, print-ready</h5>
                            <p data-en="We design a unique QR code for each table, ready to print. You set them on the tables and you're live." data-ro="Proiectăm un cod QR unic pentru fiecare masă, gata de tipărit. Le pui pe mese și ești live.">We design a unique QR code for each table, ready to print. You set them on the tables and you're live.</p>
                        </div>
                        <div class="feature-item">
                            <h5 data-en="🌐 Domain & setup" data-ro="🌐 Domeniu & configurare">🌐 Domain & setup</h5>
                            <p data-en="No domain yet? We set one up. We handle the technical side; you run your business." data-ro="Nu ai domeniu? Îl configurăm noi. Noi ne ocupăm de partea tehnică; tu îți conduci afacerea.">No domain yet? We set one up. We handle the technical side; you run your business.</p>
                        </div>
                        <div class="feature-item">
                            <h5 data-en="👥 In-person meetings" data-ro="👥 Întâlniri în persoană">👥 In-person meetings</h5>
                            <p data-en="We sit at the table with your team, learn how your venue runs, and shape APETIT around it." data-ro="Ne așezăm la masă cu echipa ta, învățăm cum funcționează localul și modelăm APETIT după el.">We sit at the table with your team, learn how your venue runs, and shape APETIT around it.</p>
                        </div>
                        <div class="feature-item">
                            <h5 data-en="🌍 Your menu, in your guests' languages" data-ro="🌍 Meniul tău, în limbile oaspeților tăi">🌍 Your menu, in your guests' languages</h5>
                            <p data-en="Your menu, in your guests' languages. Tourists order without any trouble." data-ro="Meniul tău, în limbile oaspeților tăi. Turiștii comandă fără nicio bătaie de cap.">Your menu, in your guests' languages. Tourists order without any trouble.</p>
                        </div>
                        <div class="feature-item">
                            <h5 data-en="📊 Reservations keep working offline" data-ro="📊 Rezervările funcționează și offline">📊 Reservations keep working offline</h5>
                            <p data-en="You manage every booking from one dashboard. If the internet drops, it keeps working, so service never stops." data-ro="Îți gestionezi toate rezervările dintr-un singur panou. Dacă pică internetul, continuă să funcționeze, ca serviciul să nu se oprească.">You manage every booking from one dashboard. If the internet drops, it keeps working, so service never stops.</p>
                        </div>
                        <div class="feature-item">
                            <h5 data-en="🧪 Tested before it reaches you" data-ro="🧪 Testat înainte să ajungă la tine">🧪 Tested before it reaches you</h5>
                            <p data-en="Separate environments and real testing before anything reaches you. Nothing breaks while you serve." data-ro="Medii separate și testare reală înainte ca orice să ajungă la tine. Nimic nu se strică în timp ce servești.">Separate environments and real testing before anything reaches you. Nothing breaks while you serve.</p>
                        </div>
                        <div class="feature-item">
                            <h5 data-en="🔧 Maintenance & support" data-ro="🔧 Întreținere & suport">🔧 Maintenance & support</h5>
                            <p data-en="If something breaks, we fix it. Updates, security, backups and server health sit inside your price." data-ro="Dacă ceva se strică, reparăm. Actualizări, securitate, backupuri și starea serverului intră în preț.">If something breaks, we fix it. Updates, security, backups and server health sit inside your price.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 9. PRICE -->
            <div class="section">
                <h2 class="section-title" data-en="Price" data-ro="Preț">Price</h2>
                <div class="pricing-section">
                    <div class="pricing-included">
                        <h4 data-en="One plan, everything included" data-ro="Un singur plan, totul inclus">One plan, everything included</h4>
                        <div class="included-grid">
                            <span data-en="QR ordering at the table" data-ro="Comandă la masă prin cod QR">QR ordering at the table</span>
                            <span data-en="Kitchen & bar screen" data-ro="Ecran bucătărie & bar">Kitchen & bar screen</span>
                            <span data-en="Reservations & table management" data-ro="Rezervări & gestionarea meselor">Reservations & table management</span>
                            <span data-en="Reviews & discount rewards" data-ro="Recenzii & reduceri">Reviews & discount rewards</span>
                            <span data-en="Your own guest list & vouchers" data-ro="Lista ta de clienți & vouchere">Your own guest list & vouchers</span>
                            <span data-en="Unique QR codes for tables & entrance" data-ro="Coduri QR unice pentru mese & intrare">Unique QR codes for tables & entrance</span>
                            <span data-en="Setup, domain & in-person training" data-ro="Configurare, domeniu & instruire în persoană">Setup, domain & in-person training</span>
                            <span data-en="Maintenance, updates & support" data-ro="Întreținere, actualizări & suport">Maintenance, updates & support</span>
                        </div>
                    </div>

                    <div class="pricing-grid compact" style="max-width: 420px;">
                        <div class="pricing-card featured">
                            <span class="badge" data-en="All inclusive" data-ro="Totul inclus">All inclusive</span>
                            <div class="price-display">
                                <div class="amount" data-en="€99 / month" data-ro="€99 / lună">€99 / lună</div>
                                <div class="period" data-en="Everything included — features, support, maintenance, updates" data-ro="Totul inclus — funcții, suport, întreținere, actualizări">Everything included — features, support, maintenance, updates</div>
                            </div>
                        </div>
                    </div>

                    <p class="pricing-note" style="font-style: normal; font-weight: 600; color: #2e5239; margin-top: 24px;" data-en="Less than a single waiter shift a month." data-ro="Mai puțin decât o singură tură de ospătar pe lună.">Less than a single waiter shift a month.</p>
                    <p class="pricing-note" style="margin-top: 10px;" data-en="No setup fee for the first 10 partners. Annual payment: 10 months instead of 12." data-ro="Fără taxă de configurare pentru primii 10 parteneri. Plată anuală: 10 luni în loc de 12.">No setup fee for the first 10 partners. Annual payment: 10 months instead of 12.</p>
                    <p class="pricing-note" data-en="Want something extra? We scope the feature with you, then price it from there." data-ro="Vrei ceva în plus? Definim funcția împreună și stabilim prețul de acolo.">Want something extra? We scope the feature with you, then price it from there.</p>
                </div>
            </div>

            <!-- 10. DATA & GDPR -->
            <div class="section">
                <h2 class="section-title" data-en="Data & GDPR" data-ro="Date & GDPR">Data & GDPR</h2>
                <p class="intro-text" data-en="We store only what we need to confirm orders and reservations. GDPR compliant." data-ro="Stocăm doar ce ne trebuie ca să confirmăm comenzi și rezervări. Conform GDPR.">We store only what we need to confirm orders and reservations. GDPR compliant.</p>
                <div class="footnote">
                    <strong data-en="🔒 The essentials:" data-ro="🔒 Esențialul:">🔒 The essentials:</strong> <span data-en="We never store card numbers — the payment processor handles that securely. We never sell your data. Guests can export or delete their data anytime. The guest relationship stays yours." data-ro="Nu stocăm niciodată numere de carduri — procesatorul de plăți se ocupă de asta în siguranță. Nu vindem datele tale niciodată. Clienții își pot exporta sau șterge datele oricând. Relația cu clientul rămâne a ta.">We never store card numbers — the payment processor handles that securely. We never sell your data. Guests can export or delete their data anytime. The guest relationship stays yours.</span>
                </div>
            </div>

            <!-- 11. FINAL CTA -->
            <div class="section" style="margin-bottom: 0;">
                <div style="background: linear-gradient(135deg, #3d6b4f 0%, #2e5239 100%); color: white; padding: 40px; border-radius: 12px; text-align: center;">
                    <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 14px;" data-en="Let's see it live in your venue" data-ro="Hai să o vedem live în localul tău">Let's see it live in your venue</h3>
                    <p style="font-size: 15px; opacity: 0.95; margin: 0 auto 24px auto; max-width: 640px;" data-en="We come to you, set up the menu and the QR codes, and you start on a few tables that same week. No commitment until you see how it runs in real service." data-ro="Venim la tine, configurăm meniul și codurile QR și o pornești pe câteva mese chiar în acea săptămână. Fără obligații până nu vezi cum merge în serviciu real.">We come to you, set up the menu and the QR codes, and you start on a few tables that same week. No commitment until you see how it runs in real service.</p>
                    <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                        <a href="https://apetit.webbinghub.io" target="_blank" rel="noopener noreferrer" style="background: white; color: #2e5239; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px;">apetit.webbinghub.io</a>
                        <a href="https://www.webbinghub.io" target="_blank" rel="noopener noreferrer" style="background: rgba(255,255,255,0.15); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px; border: 1px solid rgba(255,255,255,0.4);">www.webbinghub.io</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>
                APETIT by WebbingHUB | <span data-en="Digital Solutions for Restaurants, Cafés & Terraces" data-ro="Soluții Digitale pentru Restaurante, Cafenele & Terase">Digital Solutions for Restaurants, Cafés & Terraces</span><br>
                <a href="https://www.webbinghub.io" target="_blank">www.webbinghub.io</a>
            </p>
        </div>
    </div>

    <script>
        const translations = {
            en: {
                // Header
                'tagline': 'Digital Platform for Restaurants, Cafés & Terraces',
                // Content
                'intro': 'APETIT is a QR-powered platform built for hospitality businesses. Customers scan a code on their table to browse, order, and reserve. You get real-time orders and reservations without the middleman fees. Simple, transparent, yours to control.',
            },
            ro: {
                'tagline': 'Platformă Digitală pentru Restaurante, Cafenele & Terase',
                'intro': 'APETIT este o platformă bazată pe coduri QR construită pentru businessuri din industria ospitalității. Clienții scanează un cod pe masă pentru a comanda și a face rezervări. Primești comenzi și rezervări în timp real fără taxe de intermediari. Simplu, transparent, sub controlul tău.',
            }
        };

        function switchLanguage(lang) {
            // Update active button
            document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            // Update all data-en and data-ro elements
            document.querySelectorAll('[data-en][data-ro]').forEach(element => {
                if (lang === 'en') {
                    element.textContent = element.getAttribute('data-en');
                } else {
                    element.textContent = element.getAttribute('data-ro');
                }
            });

            // Update HTML lang attribute
            document.documentElement.lang = lang;

            // Save preference
            localStorage.setItem('preferredLanguage', lang);
        }

        // Load saved language preference on page load
        window.addEventListener('DOMContentLoaded', function() {
            const savedLang = localStorage.getItem('preferredLanguage') || 'en';
            const quote = String.fromCharCode(39);
            const selector = '[onclick="switchLanguage(' + quote + savedLang + quote + ')"]';
            const btn = document.querySelector(selector);
            if (btn) {
                btn.click();
            }
        });
    </script>
</body>
</html>
`;

export function GET() {
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      // Belt-and-suspenders no-index (also enforced via robots.txt + <meta>).
      "x-robots-tag": "noindex, nofollow, noarchive",
      "cache-control": "public, max-age=3600, must-revalidate",
    },
  });
}
