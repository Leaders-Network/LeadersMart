# PowerShell script to download sample product images from Unsplash
# Run this script: .\download-images.ps1

Write-Host "Downloading sample product images..." -ForegroundColor Green

# Create images directory if it doesn't exist
$imagesDir = "public\images\products"
if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir -Force | Out-Null
}

# Array of image URLs from Unsplash (free to use)
$images = @(
    @{url="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80"; name="smartphone-1.jpg"},
    @{url="https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80"; name="smartwatch-1.jpg"},
    @{url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"; name="headphones-1.jpg"},
    @{url="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80"; name="laptop-1.jpg"},
    @{url="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"; name="watch-1.jpg"},
    @{url="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"; name="shoes-1.jpg"},
    @{url="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80"; name="sunglasses-1.jpg"},
    @{url="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80"; name="sneakers-1.jpg"},
    @{url="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80"; name="smartwatch-2.jpg"},
    @{url="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80"; name="headphones-2.jpg"},
    @{url="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80"; name="perfume-1.jpg"},
    @{url="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80"; name="backpack-1.jpg"}
)

$count = 0
foreach ($image in $images) {
    $outputPath = Join-Path $imagesDir $image.name
    
    try {
        Write-Host "Downloading $($image.name)..." -ForegroundColor Cyan
        Invoke-WebRequest -Uri $image.url -OutFile $outputPath -UseBasicParsing
        $count++
        Write-Host "✓ Downloaded $($image.name)" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Failed to download $($image.name): $_" -ForegroundColor Red
    }
}

Write-Host "`nDownload complete! $count images downloaded to $imagesDir" -ForegroundColor Green
Write-Host "You can now update your products.ts file to use these images." -ForegroundColor Yellow
