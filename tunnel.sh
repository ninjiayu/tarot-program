#!/bin/bash
# Loran Tarot 公网隧道启动脚本

cd "$(dirname "$0")"

# 1. 启动本地静态服务器（后台）
echo "🌙 正在启动本地服务器..."
python3 -m http.server 3456 --directory dist &
SERVER_PID=$!
sleep 2

# 2. 检查服务器是否成功
if ! curl -s -o /dev/null -w "%{http_code}" http://localhost:3456/ | grep -q "200"; then
    echo "❌ 本地服务器启动失败"
    exit 1
fi
echo "✅ 本地服务器已就绪: http://localhost:3456"

# 3. 启动 localtunnel 公网隧道
echo "🌐 正在创建公网隧道..."
npx localtunnel --port 3456 &
TUNNEL_PID=$!

# 4. 等待并显示 URL
sleep 5
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ 公网访问地址已生成！"
echo "  （首次访问可能需要点击 Continue）"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

# 等待中断
trap "kill $SERVER_PID $TUNNEL_PID 2>/dev/null; exit" INT
wait
