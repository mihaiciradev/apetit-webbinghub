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
            <p class="tagline" data-en="Digital Platform for Restaurants, Cafés & Hotels" data-ro="Platformă Digitală pentru Restaurante, Cafenele & Hoteluri">Digital Platform for Restaurants, Cafés & Hotels</p>
        </div>

        <!-- Content -->
        <div class="content">
            <!-- Introduction -->
            <div class="section">
                <p class="intro-text" data-en="APETIT is a QR-powered platform built for hospitality businesses. Customers scan a code on their table to browse, order, and reserve. You get real-time orders and reservations with full control over your customer data. Simple, transparent, all yours." data-ro="APETIT este o platformă bazată pe coduri QR construită pentru businessuri din industria ospitalității. Clienții scanează un cod pe masa pentru a comanda și a face rezervări. Primești comenzi și rezervări în timp real cu control total asupra datelor clienților. Simplu, transparent, complet al tău.">APETIT is a QR-powered platform built for hospitality businesses. Customers scan a code on their table to browse, order, and reserve. You get real-time orders and reservations with full control over your customer data. Simple, transparent, all yours.</p>
            </div>

            <!-- MODULE 1 -->
            <div class="section">
                <h2 class="section-title" data-en="MODULE 1: Interactive Menu (Powered by QR Code)" data-ro="MODUL 1: Meniu Interactiv (Bazat pe Cod QR)">MODULE 1: Interactive Menu (Powered by QR Code)</h2>

                <div class="modules-grid">
                    <div class="module-card">
                        <h3>
                            <span data-en="📋 Browse & Order" data-ro="📋 Răsfoiește & Comandă">📋 Browse & Order</span>
                            <span class="label" data-en="Core" data-ro="Esențial">Core</span>
                        </h3>
                        <ul>
                            <li data-en="Scan QR on table → instant menu" data-ro="Scanează codul QR de pe masă → meniu instant">Scan QR on table → instant menu</li>
                            <li data-en="Browse organized by category" data-ro="Răsfoiește organizat pe categorii">Browse organized by category</li>
                            <li data-en="See photos, descriptions, prices" data-ro="Vezi fotografii, descrieri, prețuri">See photos, descriptions, prices</li>
                            <li data-en="Add items to cart, adjust quantities" data-ro="Adaugă articole la coș, ajustează cantități">Add items to cart, adjust quantities</li>
                            <li data-en="View order status in real-time" data-ro="Vezi status comenzii în timp real">View order status in real-time</li>
                            <li data-en="Keep order history for quick reorders" data-ro="Păstrează istoric comenzi pentru recomandări rapide">Keep order history for quick reorders</li>
                            <li data-en="Filter by dietary needs (vegan, allergies)" data-ro="Filtrează după nevoi dietetice (vegan, alergii)">Filter by dietary needs (vegan, allergies)</li>
                            <li data-en="Rate dishes, leave feedback" data-ro="Evaluează mâncăruri, lasă feedback">Rate dishes, leave feedback</li>
                            <li data-en="Choose: Dine-in or Takeaway" data-ro="Alege: Mâncare la local sau de luat">Choose: Dine-in or Takeaway</li>
                        </ul>
                        <p class="note" data-en="Customers don't need to download an app. One scan on the table = they're ordering." data-ro="Clienții nu trebuie să descarce o aplicație. Un singur scan pe masă = comandă">Customers don't need to download an app. One scan on the table = they're ordering.</p>
                    </div>
                </div>
            </div>

            <!-- Additional Features -->
            <div class="section">
                <h2 class="section-title" data-en="Interactive Menu Features" data-ro="Caracteristici Meniu Interactiv">Interactive Menu Features</h2>

                <div class="feature-section">
                    <div class="features-grid">
                        <div class="feature-item">
                            <h5 data-en="🔔 Call Waiter Button" data-ro="🔔 Buton Apelează Chelnerul">🔔 Call Waiter Button</h5>
                            <p data-en="Customers tap a button on their phone to call the waiter instantly. No more waiting or looking around. Staff gets a real-time alert with table number." data-ro="Clienții ating un buton pe telefon pentru a apela chelnerul instant. Fără așteptări sau căutări. Personalul primește alertă în timp real cu numărul mesei.">Customers tap a button on their phone to call the waiter instantly. No more waiting or looking around. Staff gets a real-time alert with table number.</p>
                        </div>

                        <div class="feature-item">
                            <h5 data-en="💳 Payment at Table" data-ro="💳 Plată la Masă">💳 Payment at Table</h5>
                            <p data-en="Two payment options: Cash (waiter collects) or Card (payment terminal at table). Simple, secure, no confusion about who pays what." data-ro="Două opțiuni de plată: Numerar (chelnerul colectează) sau Card (terminalul la masă). Simplu, sigur, fără confuzie despre cine plătește ce.">Two payment options: Cash (waiter collects) or Card (payment terminal at table). Simple, secure, no confusion about who pays what.</p>
                        </div>

                        <div class="feature-item">
                            <h5 data-en="💻 Online Payment (Optional Add-On)" data-ro="💻 Plată Online (Modul Optional)">💻 Online Payment (Optional Add-On)</h5>
                            <p data-en="Enable customers to pay directly through the app before the waiter arrives. Perfect for restaurants wanting a fully digital experience. You decide if it's enabled for your menu." data-ro="Permite clienților să plătească direct prin app înainte să ajungă chelnerul. Perfect pentru restaurante care doresc experiență digital completă. Tu hotărăști dacă e activă.">Enable customers to pay directly through the app before the waiter arrives. Perfect for restaurants wanting a fully digital experience. You decide if it's enabled for your menu.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section">
                <h2 class="section-title" data-en="MODULE 2: Reservations & Reviews" data-ro="MODUL 2: Rezervări & Recenzii">MODULE 2: Reservations & Reviews</h2>

                <div class="modules-grid">
                    <div class="module-card">
                        <h3>
                            <span data-en="📅 Make & Manage Reservations" data-ro="📅 Creează & Gestionează Rezervări">📅 Make & Manage Reservations</span>
                            <span class="label" data-en="Core" data-ro="Esențial">Core</span>
                        </h3>
                        <ul>
                            <li data-en="Pick date, time, party size" data-ro="Alege dată, oră, mărimea grupului">Pick date, time, party size</li>
                            <li data-en="Get email confirmation immediately" data-ro="Primește confirmarea email imediat">Get email confirmation immediately</li>
                            <li data-en="Modify or cancel anytime" data-ro="Modifică sau anulează oricând">Modify or cancel anytime</li>
                            <li data-en="See all past and upcoming bookings" data-ro="Vezi toate rezervările anterioare și viitoare">See all past and upcoming bookings</li>
                            <li data-en="Special notes (high chair, quiet table, etc.)" data-ro="Note speciale (scaun pentru copii, masă liniștit, etc.)">Special notes (high chair, quiet table, etc.)</li>
                            <li data-en="Entrance QR code for walk-in bookings" data-ro="Cod QR la intrare pentru rezervări spontane">Entrance QR code for walk-in bookings</li>
                            <li class="subtext" data-en="(shows immediate availability - converts walk-ins to future bookings)" data-ro="(arată disponibilitate imediată - transformă clienți spontani în rezervări viitoare)">(shows immediate availability - converts walk-ins to future bookings)</li>
                        </ul>
                        <p class="note" data-en="Perfect for restaurants where table availability matters. Fewer no-shows, better planning." data-ro="Perfect pentru restaurante unde disponibilitatea mesei conteaza. Mai puține absențe, planificare mai bună.">Perfect for restaurants where table availability matters. Fewer no-shows, better planning.</p>
                    </div>

                    <div class="module-card">
                        <h3>
                            <span data-en="⭐ Reviews & Discounts" data-ro="⭐ Recenzii & Reduceri">⭐ Reviews & Discounts</span>
                            <span class="label" data-en="Core" data-ro="Esențial">Core</span>
                        </h3>
                        <ul>
                            <li data-en="Leave reviews after dining" data-ro="Lasă recenzii după ce mânânci">Leave reviews after dining</li>
                            <li data-en="Rate: 1-5 stars, add photos" data-ro="Evaluează: 1-5 stele, adaugă poze">Rate: 1-5 stars, add photos</li>
                            <li data-en="Targeted reviews: Service, Waiter, Venue, Food/Kitchen" data-ro="Recenzii specifice: Serviciu, Chelner, Spațiu, Mâncare/Bucătărie">Targeted reviews: Service, Waiter, Venue, Food/Kitchen</li>
                            <li data-en="Earn 8% discount for positive reviews (paid via app)" data-ro="Câștigă 8% reducere pentru recenzii pozitive (plătit prin app)">Earn 8% discount for positive reviews (paid via app)</li>
                            <li data-en="Discount code valid for next order" data-ro="Cod reducere valabil pentru comanda următoare">Discount code valid for next order</li>
                            <li data-en="Admin sees reviews for quality control" data-ro="Admin vede recenziile pentru control de calitate">Admin sees reviews for quality control</li>
                            <li class="subtext" data-en="(public reviews appear on Google, internal reviews visible to staff only)" data-ro="(recenziile publice apar pe Google, recenziile interne sunt doar pentru staff)">(public reviews appear on Google, internal reviews visible to staff only)</li>
                        </ul>
                        <p class="note" data-en="Builds authentic feedback. Incentivizes repeat visits. Win-win." data-ro="Construiește feedback autentic. Încurajează vizite repetate. Câștig pentru toți.">Builds authentic feedback. Incentivizes repeat visits. Win-win.</p>
                    </div>
                </div>
            </div>

            <!-- STAFF DASHBOARD -->
            <div class="section">
                <h2 class="section-title" data-en="Staff Dashboard & Notifications" data-ro="Panoul Personal & Notificări">Staff Dashboard & Notifications</h2>

                <div class="modules-grid">
                    <div class="module-card">
                        <h3>
                            <span data-en="📱 Real-Time Staff Notifications" data-ro="📱 Notificări Personal în Timp Real">📱 Real-Time Staff Notifications</span>
                            <span class="label" data-en="MODULE 1 CORE" data-ro="MODUL 1 ESENȚIAL">MODULE 1 CORE</span>
                        </h3>
                        <ul>
                            <li data-en="New order alert → staff tablet/phone" data-ro="Alertă comandă nouă → tableta/telefon personal">New order alert → staff tablet/phone</li>
                            <li data-en="New reservation notification" data-ro="Notificare rezervare nouă">New reservation notification</li>
                            <li data-en="Customer calls server → instant alert" data-ro="Client apelează chelnerul → alertă instantă">Customer calls server → instant alert</li>
                            <li data-en="New review posted → notified immediately" data-ro="Recenzie nouă publicată → notificare imediată">New review posted → notified immediately</li>
                            <li data-en="Negative review alert → act quickly" data-ro="Alertă recenzie negativă → acționează rapid">Negative review alert → act quickly</li>
                            <li data-en="Order status updates in real-time" data-ro="Actualizări status comandă în timp real">Order status updates in real-time</li>
                            <li data-en="Sound & visual alerts (customizable)" data-ro="Alerte sonore și vizuale (personalizabile)">Sound & visual alerts (customizable)</li>
                        </ul>
                        <p class="note" data-en="Your team never misses an order, reservation, or important customer action." data-ro="Echipa ta nu va rata nicio comandă, rezervare sau acțiune importantă de client.">Your team never misses an order, reservation, or important customer action.</p>
                    </div>

                    <div class="module-card">
                        <h3>
                            <span data-en="📊 Order & Reservation Management" data-ro="📊 Gestionare Comenzi & Rezervări">📊 Order & Reservation Management</span>
                            <span class="label" data-en="MODULE 2 CORE" data-ro="MODUL 2 ESENȚIAL">MODULE 2 CORE</span>
                        </h3>
                        <ul>
                            <li data-en="View all pending orders with table number" data-ro="Vezi toate comenzile în așteptare cu numărul mesei">View all pending orders with table number</li>
                            <li data-en="See order status (pending, preparing, ready)" data-ro="Vezi status comandă (în așteptare, se pregătește, gată)">See order status (pending, preparing, ready)</li>
                            <li data-en="Manage table reservations for the day" data-ro="Gestionează rezervări de mese pentru ziua">Manage table reservations for the day</li>
                            <li data-en="Confirm/cancel reservations" data-ro="Confirmă/anulează rezervări">Confirm/cancel reservations</li>
                            <li data-en="Track no-shows automatically" data-ro="Urmărește absențele automat">Track no-shows automatically</li>
                            <li data-en="See special requests (allergies, etc.)" data-ro="Vezi cereri speciale (alergii, etc.)">See special requests (allergies, etc.)</li>
                            <li data-en="Send confirmation messages to customers" data-ro="Trimite mesaje de confirmare clienților">Send confirmation messages to customers</li>
                            <li data-en="View & respond to customer reviews" data-ro="Vezi & răspunde la recenziile clienților">View & respond to customer reviews</li>
                        </ul>
                        <p class="note" data-en="Kitchen knows exactly what to make. Waiters know what to deliver. No confusion." data-ro="Bucătăria știe exact ce să gătească. Chelnerul știe ce să servească. Fără confuzie.">Kitchen knows exactly what to make. Waiters know what to deliver. No confusion.</p>
                    </div>
                </div>
            </div>

            <!-- WHAT WE PROVIDE -->
            <div class="section">
                <h2 class="section-title" data-en="What We Provide" data-ro="Ce Oferim Noi">What We Provide</h2>

                <div class="feature-section">
                    <div class="features-grid">
                        <div class="feature-item">
                            <h5 data-en="🔗 Unique QR Codes for Your Tables" data-ro="🔗 Coduri QR Unice pentru Mesele Tale">🔗 Unique QR Codes for Your Tables</h5>
                            <p data-en="We design and provide unique QR codes for each table. Just print them, place them on your tables, and you're done." data-ro="Proiectez și furnizez coduri QR unice pentru fiecare masă. Doar tipărește, pune pe mese și gata.">We design and provide unique QR codes for each table. Just print them, place them on your tables, and you're done.</p>
                        </div>

                        <div class="feature-item">
                            <h5 data-en="🌐 Website Domain & Setup" data-ro="🌐 Domeniu Website & Configurare">🌐 Website Domain & Setup</h5>
                            <p data-en="If you do not have a domain already, we help you set it up. We handle the technical side—you focus on your business." data-ro="Dacă nu ai deja un domeniu, te ajutăm să-l configurezi. Noi ne ocupăm de partea tehnică—tu te concentrezi pe afacere.">If you do not have a domain already, we help you set it up. We handle the technical side—you focus on your business.</p>
                        </div>

                        <div class="feature-item">
                            <h5 data-en="👥 In-Person Strategy Meetings" data-ro="👥 Ședințe de Strategie în Persoană">👥 In-Person Strategy Meetings</h5>
                            <p data-en="We meet with your team to understand your specific business needs, challenges, and goals. We customize APETIT to fit your restaurant perfectly." data-ro="Ne întâlnim direct cu echipa ta pentru a înțelege nevoile, provocările și obiectivele specifice ale businessului tău. Adaptez APETIT perfect pentru restaurantul tău.">We meet with your team to understand your specific business needs, challenges, and goals. We customize APETIT to fit your restaurant perfectly.</p>
                        </div>

                        <div class="feature-item">
                            <h5 data-en="📍 Entrance Reservation QR Code" data-ro="📍 Cod QR Rezervare la Intrare">📍 Entrance Reservation QR Code</h5>
                            <p data-en="We provide a QR code for your entrance so walk-ins can book future tables. Converts lost customers into future revenue." data-ro="Furnizez un cod QR la intrare pentru ca clienți spontani să facă rezervări viitoare. Transformă clienți pierduți în venituri viitoare.">We provide a QR code for your entrance so walk-ins can book future tables. Converts lost customers into future revenue.</p>
                        </div>

                        <div class="feature-item">
                            <h5 data-en="🔧 Maintenance & Technical Support" data-ro="🔧 Întreținere & Suport Tehnic">🔧 Maintenance & Technical Support</h5>
                            <p data-en="If anything breaks, we fix it immediately. Updates, security, backups, server health—all included in your price." data-ro="Dacă ceva se strică, o reparăm imediat. Actualizări, securitate, copii de rezervă, sănătate server—totul inclus în preț.">If anything breaks, we fix it immediately. Updates, security, backups, server health—all included in your price.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- PRICING SECTION -->
            <div class="section">
                <h2 class="section-title" data-en="Pricing" data-ro="Prețuri">Pricing</h2>

                <div class="pricing-section">
                    <div class="pricing-intro">
                        <h3 data-en="Same Platform, Two Ways to Pay" data-ro="Aceeași Platformă, Două Moduri de Plată">Same Platform, Two Ways to Pay</h3>
                        <p class="intro-text" style="text-align: center; margin-bottom: 0;" data-en="You get exactly the same platform either way — only how you pay differs." data-ro="Primești exact aceeași platformă în ambele cazuri — diferă doar modul în care plătești.">You get exactly the same platform either way — only how you pay differs.</p>
                    </div>

                    <!-- Everything included (same for both plans) -->
                    <div class="pricing-included">
                        <h4 data-en="Everything Included" data-ro="Totul Inclus">Everything Included</h4>
                        <div class="included-grid">
                            <span data-en="MODULE 1: Interactive Menu — QR code ordering" data-ro="MODUL 1: Meniu Interactiv — comandă prin cod QR">MODULE 1: Interactive Menu — QR code ordering</span>
                            <span data-en="MODULE 2: Reservations & table management" data-ro="MODUL 2: Rezervări & gestionarea meselor">MODULE 2: Reservations & table management</span>
                            <span data-en="Customer reviews & discount rewards" data-ro="Recenzii de la clienți & reduceri">Customer reviews & discount rewards</span>
                            <span data-en="Staff dashboard & real-time notifications" data-ro="Panou personal & notificări în timp real">Staff dashboard & real-time notifications</span>
                            <span data-en="Admin analytics & performance tracking" data-ro="Analiză admin & urmărirea performanței">Admin analytics & performance tracking</span>
                            <span data-en="Unique QR codes for tables & entrance" data-ro="Coduri QR unice pentru mese & intrare">Unique QR codes for tables & entrance</span>
                            <span data-en="Help with setup & website domain" data-ro="Ajutor cu configurarea & domeniul website-ului">Help with setup & website domain</span>
                            <span data-en="Maintenance & technical support" data-ro="Întreținere & suport tehnic">Maintenance & technical support</span>
                            <span data-en="In-person meetings with our team" data-ro="Întâlniri în persoană cu echipa noastră">In-person meetings with our team</span>
                        </div>
                    </div>

                    <div class="pricing-grid compact">
                        <!-- Plan 1: Monthly -->
                        <div class="pricing-card featured">
                            <span class="badge" data-en="Monthly Plan" data-ro="Plan Lunar">Monthly Plan</span>
                            <h4 data-en="Monthly Subscription" data-ro="Abonament Lunar">Monthly Subscription</h4>

                            <div class="price-display">
                                <div class="amount">€80<span style="font-size: 14px; color: #999;"> first 3 months</span></div>
                                <div class="amount" style="font-size: 28px; margin-top: 8px;">€199<span style="font-size: 14px;">/month</span></div>
                                <div class="period" data-en="Then €199/month ongoing" data-ro="Apoi €199/lună permanent">Then €199/month ongoing</div>
                            </div>
                        </div>

                        <!-- Plan 2: Commission -->
                        <div class="pricing-card">
                            <span class="badge" data-en="Pay-Per-Use" data-ro="Plătește pe Utilizare">Pay-Per-Use</span>
                            <h4 data-en="Commission Model" data-ro="Model pe Comision">Commission Model</h4>

                            <div class="price-display">
                                <div class="amount">€600<span style="font-size: 18px;"> + 5%</span></div>
                                <div class="period" data-en="Setup fee + commission per online order" data-ro="Taxă de configurare + comision per comandă online">Setup fee + commission per online order</div>
                            </div>
                        </div>
                    </div>

                    <p class="pricing-note" data-en="Need something more? Extra functionality is always welcome — we scope it together and discuss pricing based on the features you want." data-ro="Ai nevoie de ceva în plus? Funcționalitățile suplimentare sunt mereu binevenite — le definim împreună și discutăm prețul în funcție de caracteristicile dorite.">Need something more? Extra functionality is always welcome — we scope it together and discuss pricing based on the features you want.</p>
                </div>
            </div>

            <!-- DATA & PRIVACY -->
            <div class="section">
                <h2 class="section-title" data-en="What We Store (GDPR-Compliant)" data-ro="Ce Stochăm (Conform GDPR)">What We Store (GDPR-Compliant)</h2>

                <p class="intro-text" data-en="We collect only what's necessary. Customers own their data and can delete it anytime." data-ro="Colectez doar ce e necesar. Clienții dețin datele și le pot șterge oricând.">We collect only what's necessary. Customers own their data and can delete it anytime.</p>

                <div class="data-section">
                    <div class="data-grid">
                        <div class="data-item">
                            <h5 data-en="👤 Customer Info" data-ro="👤 Informații Client">👤 Customer Info</h5>
                            <p data-en="Email, name, phone, delivery address, dietary preferences. Why: To confirm orders and send reservations." data-ro="Email, nume, telefon, adresă livrare, preferințe dietetice. De ce: Pentru a confirma comenzi și trimite rezervări.">Email, name, phone, delivery address, dietary preferences. Why: To confirm orders and send reservations.</p>
                        </div>

                        <div class="data-item">
                            <h5 data-en="📦 Order Details" data-ro="📦 Detalii Comandă">📦 Order Details</h5>
                            <p data-en="What was ordered, quantities, prices, order date/time, table number. Why: To process orders and enable tracking." data-ro="Ce s-a comandat, cantități, prețuri, dată/oră comandă, număr masă. De ce: Pentru a procesa comenzi și activa urmărirea.">What was ordered, quantities, prices, order date/time, table number. Why: To process orders and enable tracking.</p>
                        </div>

                        <div class="data-item">
                            <h5 data-en="📅 Reservations" data-ro="📅 Rezervări">📅 Reservations</h5>
                            <p data-en="Date, time, party size, special requests. Why: To manage your reservation calendar." data-ro="Dată, oră, mărime grup, cereri speciale. De ce: Pentru a gestiona calendarul de rezervări.">Date, time, party size, special requests. Why: To manage your reservation calendar.</p>
                        </div>

                        <div class="data-item">
                            <h5 data-en="⭐ Reviews & Feedback" data-ro="⭐ Recenzii & Feedback">⭐ Reviews & Feedback</h5>
                            <p data-en="Rating (1-5), written review, photos if shared. Why: To build social proof and improve service." data-ro="Evaluare (1-5), recenzie scrisă, fotografii dacă sunt partajate. De ce: Pentru a construi dovezi sociale și îmbunătăți serviciul.">Rating (1-5), written review, photos if shared. Why: To build social proof and improve service.</p>
                        </div>

                        <div class="data-item">
                            <h5 data-en="💳 Payment (if enabled)" data-ro="💳 Plată (dacă activată)">💳 Payment (if enabled)</h5>
                            <p data-en="We never store card numbers. Payment processor handles sensitive data securely. Why: To process transactions (PCI compliant)." data-ro="Nu stochem niciodată numere de carduri. Procesatorul de plăți gestionează datele sensibile în siguranță. De ce: Pentru a procesa tranzacții (conformă PCI).">We never store card numbers. Payment processor handles sensitive data securely. Why: To process transactions (PCI compliant).</p>
                        </div>
                    </div>
                </div>

                <div class="footnote">
                    <strong data-en="🔒 Privacy:" data-ro="🔒 Confidențialitate:">🔒 Privacy:</strong> <span data-en="GDPR & CCPA compliant. Customers can request or delete their data anytime. We never sell customer information. Your restaurant owns the customer relationship." data-ro="Conformă GDPR și CCPA. Clienții pot solicita sau șterge datele oricând. Nu vindem niciodată informații despre clienți. Restaurantul tău deține relația cu clienții.">GDPR & CCPA compliant. Customers can request or delete their data anytime. We never sell customer information. Your restaurant owns the customer relationship.</span></p>
                </div>
            </div>

            <!-- MAINTENANCE FOOTER -->
            <div style="background: linear-gradient(135deg, #3d6b4f 0%, #2e5239 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-top: 40px;">
                <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 10px;">🔧 <span data-en="Maintenance & Support Included" data-ro="Întreținere & Suport Incluse">Maintenance & Support Included</span></h3>
                <p style="font-size: 14px; opacity: 0.95; margin: 0;">
                    <strong data-en="If anything fails or breaks, we fix it." data-ro="Dacă orice se strică, o reparăm.">If anything fails or breaks, we fix it.</strong> <span data-en="Maintenance, updates, and support are included in the price. You don't worry about technical issues—we handle it." data-ro="Întreținerea, actualizările și suportul sunt incluse în preț. Nu te îngrijora de probleme tehnice—noi ne ocupăm.">Maintenance, updates, and support are included in the price. You don't worry about technical issues—we handle it.</span>
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>
                APETIT by WebbingHUB | <span data-en="Digital Solutions for Restaurants, Cafés & Hotels" data-ro="Soluții Digitale pentru Restaurante, Cafenele & Hoteluri">Digital Solutions for Restaurants, Cafés & Hotels</span><br>
                <a href="https://www.webbinghub.io" target="_blank">www.webbinghub.io</a>
            </p>
        </div>
    </div>

    <script>
        const translations = {
            en: {
                // Header
                'tagline': 'Digital Platform for Restaurants, Cafés & Hotels',
                // Content
                'intro': 'APETIT is a QR-powered platform built for hospitality businesses. Customers scan a code on their table to browse, order, and reserve. You get real-time orders and reservations without the middleman fees. Simple, transparent, yours to control.',
            },
            ro: {
                'tagline': 'Platformă Digitală pentru Restaurante, Cafenele & Hoteluri',
                'intro': 'APETIT este o platformă bazată pe coduri QR construită pentru businessuri din industria ospitalității. Clienții scanează un cod pe masa pentru a comanda și a face rezervări. Primești comenzi și rezervări în timp real fără taxe de intermediari. Simplu, transparent, sub controlul tău.',
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
