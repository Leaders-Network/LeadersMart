#!/bin/bash
# Bash script to download sample product images from Unsplash
# Run this script: bash download-images.sh

echo "Downloading sample product images..."

# Create images directory if it doesn't exist
mkdir -p public/images/products

# Array of image URLs and names
declare -A images=(
    ["smartphone-1.jpg"]="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80"
    ["smartwatch-1.jpg"]="https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80"
    ["headphones-1.jpg"]="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"
    ["laptop-1.jpg"]="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80"
    ["watch-1.jpg"]="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"
    ["shoes-1.jpg"]="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"
    ["sunglasses-1.jpg"]="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80"
    ["sneakers-1.jpg"]="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80"
    ["smartwatch-2.jpg"]="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80"
    ["headphones-2.jpg"]="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80"
    ["perfume-1.jpg"]="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80"
    ["backpack-1.jpg"]="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80"
)

count=0
for name in "${!images[@]}"; do
    url="${images[$name]}"
    echo "Downloading $name..."
    
    if curl -L "$url" -o "public/images/products/$name" --silent --show-error; then
        echo "✓ Downloaded $name"
        ((count++))
    else
        echo "✗ Failed to download $name"
    fi
done

echo ""
echo "Download complete! $count images downloaded to public/images/products"
echo "You can now update your products.ts file to use these images."
