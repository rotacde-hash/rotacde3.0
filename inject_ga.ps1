$ga = @"
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1R380CBM22"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-1R380CBM22');
    </script>
</head>
"@

Get-ChildItem -Path "d:\Antigravity\public\rota cde 3.0.1" -Filter "*.html" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -notmatch "G-1R380CBM22") {
        $newContent = $content -replace "</head>", $ga
        Set-Content -Path $_.FullName -Value $newContent
    }
}
