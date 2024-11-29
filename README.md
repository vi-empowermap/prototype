# Empowermap Frontend Deployment update

[[redirects]]
  from = "/api/*"
  to = "https://cms.padlas.de/api/:splat"
  status = 200
  force = true

[[headers]]
  for = "/api/*" # API 요청 경로에 대해 헤더 적용
  [headers.values]
    Access-Control-Allow-Origin = "https://padlas.de"  # 정확한 도메인 설정
    Access-Control-Allow-Methods = "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    Access-Control-Allow-Headers = "Content-Type, Authorization, X-CSRF"
    Access-Control-Allow-Credentials = "true"
    Referrer-Policy = "strict-origin-when-cross-origin"



## TODOS

- [ ] Update Marker Icon
- [ ] Orga Icons
- [ ] Web Icons
- [ ] Intro Map Image

### Experiments

- [Experiments](https://github.com/DainPark-web/empowermap_vis_experiment)
- [Backend](https://github.com/vi-empowermap/backend)

### Repo

- Dev :

### Memo

<https://gsap.com/resources/React/>

#### Google MAP API

```bash

https://www.google.com/maps/search/?api=1&query=<lat>,<lng>

```


# Error Note
### Netlify: Troubleshooting SSL certificate errors
[solution1](https://answers.netlify.com/t/support-guide-troubleshooting-ssl-certificate-errors/39865?_gl=1*4un6xy*_gcl_au*MTkwNTEzNjkxNC4xNzI3MjUyNzUxLjE3MTM3NzE0NzcuMTcyNzI1Mjc4MC4xNzI3MjUyODM0)

- Step 1 - Check DNS
First, you’ll want to double-check your DNS settings.

If you’re using external DNS 994, your A Record for your bare domain should point to 75.2.60.5, while the CNAME record for your subdomain www should have the value [sitename].netlify.app within the configuration at either your registrar or other DNS provider.




### Netlify CORS issue client side fetch

- [ref1](https://answers.netlify.com/t/client-side-fetch-cors-issue/43202/3)
Solution1 : When using SSR (Server-Side Rendering), server-to-server requests don’t trigger CORS issues because they don’t involve the browser. Instead, the server directly communicates with external APIs or services, allowing you to bypass CORS restrictions.




### Note

```
www.padlas.de ist der Internetauftritt der Online-Karte PADlas - Projekte und Initiativen gegen Anti-Schwarzen Rassismus und für die Empowerment Schwarzer Menschen in Deutschland. Die Karte wurde erstellt im Rahmen des Kompetenznetzwerks Anti-Schwarzer Rassismus (KomPAD) bestehend aus dem Each One Teach One e. V. und der Initiative Schwarze Menschen in Deutschland Bund e.V.

Der Internetauftritt von PADlas wird durch Each One Teach One e. V.  gemäß § 5 TMG angeboten:
Each One Teach One e. V. 
Togostr. 76
13351 Berlin
Vereinsregister: VR 31576B
Registergericht: Amtsgericht Charlottenburg
Vertreten durch:

Vorstand von Each One Teach One e. V.
Kontakt
Telefon: +49 (0) 30 51304163 
E-Mail: info@kompad.de / info@eoto-archiv.de

Haftung für Inhalte
Obwohl wir uns um Aktualität, Vollständigkeit und Richtigkeit der Inhalte unserer Seiten bemühen, können wir hierfür keine Garantie übernehmen. Nach § 7 Absatz 1 TDG sind wir als Diensteanbieter für eigene Inhalte auf unseren Seiten nach den allgemeinen Gesetzen verantwortlich. Eine Verpflichtung zur Überwachung übermittelter oder gespeicherter fremder Informationen besteht jedoch nicht (§§ 8-10 TDG). Sobald uns Rechtsverstöße bekannt werden, werden wir die entsprechenden Inhalte umgehend entfernen. Eine dahingehende Haftung wird jedoch erst ab dem Zeitpunkt der Kenntnis konkreter Rechtsverletzungen übernommen.
Haftung für Links
Unsere Seiten enthalten Links auf externe Webseiten Dritter. Auf die Inhalte dieser verlinkten Webseiten haben wir keinen Einfluss. Für die Richtigkeit der Inhalte ist immer der jeweilige Anbieter oder Betreiber verantwortlich, weshalb wir diesbezüglich keinerlei Gewähr übernehmen. Die fremden Webseiten haben wir zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Zum Zeitpunkt der Verlinkung waren keinerlei Rechtsverletzungen erkennbar. Eine ständige Überprüfung sämtlicher Inhalte der von uns verlinkten Seiten ohne tatsächliche Anhaltspunkte für einen Rechtsverstoß können wir nicht leisten. Falls uns Rechtsverletzungen bekannt werden, werden wir die entsprechenden Links sofort entfernen

Gestaltung & Umsetzung:
(link: https://visual-intelligence.org text: Visual Intelligence )

```