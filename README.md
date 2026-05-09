# 每日塔罗 | Daily Tarot

基于 React + Vite + Tailwind CSS + Framer Motion 构建的塔罗牌 Web 应用。

## 功能特性

- **每日一牌**：抽取单张牌获取今日核心指引
- **三张牌阵**：过去·现在·未来，揭示时间线上的能量流动
- **78 张完整牌组**：包含 22 张大阿尔卡那 + 56 张小阿尔卡那
- **正位/逆位判定**：30% 概率出现逆位，提供双重解读维度
- **精美动画**：Framer Motion 驱动的翻牌、转场和交互动画
- **响应式设计**：完美适配桌面和移动端

## 技术栈

- **框架**：React 18 + Vite 5
- **样式**：Tailwind CSS 3
- **动画**：Framer Motion 11
- **图标**：Lucide React
- **语言**：JavaScript

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
daily-tarot-app/
├── public/
│   └── tarot-icon.svg          # 应用图标
├── src/
│   ├── components/
│   │   ├── HomePage.jsx        # 首页 - 选择牌阵类型
│   │   ├── TarotCard.jsx       # 塔罗牌组件 - 翻牌动画
│   │   └── ReadingView.jsx     # 解读视图 - 牌面展示与解读
│   ├── data/
│   │   └── tarotData.js        # 78 张塔罗牌完整数据
│   ├── App.jsx                 # 主应用组件
│   ├── index.css               # 全局样式 + Tailwind
│   └── main.jsx                # 应用入口
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 核心数据

`tarotData.js` 包含全部 78 张牌的完整数据：

- **大阿尔卡那**（22 张）：The Fool (0) ~ The World (21)
- **小阿尔卡那**（56 张）：
  - 权杖 Wands（14 张）
  - 圣杯 Cups（14 张）
  - 宝剑 Swords（14 张）
  - 星币 Pentacles（14 张）

每张牌包含：id、名称、数字、牌组类型、花色、关键词、正位含义、逆位含义、描述。

导出工具函数：
- `fullDeck` - 完整牌组数组
- `getCardById(id)` - 按 ID 获取单张牌
- `getRandomCard()` - 随机抽取单张牌（含逆位判定）
- `drawCards(count)` - 抽取指定数量的不重复牌（含逆位判定）

## 界面预览

1. **首页**：深色星空主题，两个牌阵选项卡片（每日一牌 / 过去现在未来）
2. **抽牌页**：卡牌背面展示，点击卡牌触发 3D 翻牌动画
3. **解读页**：展开牌面信息，显示关键词、正逆位含义、今日启示
