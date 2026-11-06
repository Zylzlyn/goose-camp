// 只在项目内维护内容。空字符串表示尚未开放；不要放入私密投稿或凭据。
window.CAMP_CONTENT = {
  // 北京时间：首日23:59点亮D1，此后每24小时累计点亮一座。
  lighting: { firstLightAt: '2026-11-02T23:59:00+08:00' },
  islands: [
    { day: 1, name: '同频信号岛', tagline: '认识不同的彼此，学着一起出发。', description: '完成世界观介绍与救援队亮相，通过状态测试破冰，再用旅行分床事件讨论需求表达与共同协商。以多人旅行中的行程安排、消费观念、团队分工等分歧为切入点，结合《花儿与少年》式的旅行抓马情境，在轻松吃瓜中交流解决人际矛盾的经验。' },
    { day: 2, name: '工作找得岛', tagline: '令人心如止水的 Offer 急救站。', description: '承接前一晚的求职漂流瓶，通过共鸣选择与具体案例互助，让求职中的困惑被回应，也让有经验的群友分享可参考的方法。' },
    { day: 3, name: '心愿买得岛', tagline: '双十一补给大作战。', description: '围绕双十一购物清单、优惠难题和购买纠结展开。冒险者分享使用经验与购买建议，再借助 AI 拆解优惠规则、比较订单组合，学会更聪明地消费，为接下来的旅程准备补给。' },
    { day: 4, name: '躺岛', tagline: '精神状态与脑洞短剧共创。', description: '通过表情包斗图、狗血故事接龙，在轻松玩梗中释放压力，共同创作「鹅岛绿泡泡短剧」。' },
    { day: 5, name: '不期鹅遇岛', tagline: '漂流明信片与陌生人连接。', description: '通过飞书提交 AI 二创图片和一句留言，经审核并获得公开同意后收录。群友可以随机抽取明信片、翻面阅读，并自愿在群里分享感受。' },
    { day: 6, name: '迷雾议事岛', tagline: '固定讨论 · 话题待确定。', description: '从现实案例出发，交流不同处境下的选择，通过倾听、补充和重新思考点亮灯塔。具体讨论话题待确定。' },
    { day: 7, name: '归航企鹅岛', tagline: '把这一周的光带走。', description: '完成救援故事，回顾共同经历，整理可保存、可复用的成果。' }
  ],
  geese: [
    { name: '长风破浪鹅', person: '丘子淇', image: 'assets/geese/长风破浪鹅.png' },
    ...[
      ['陈泓熹', '极地旅游博主鹅', 619],
      ['江蔚云', '行囊主理鹅', 622],
      ['李佳谕', '奇遇信使鹅', 615],
      ['黄丹琳', '冬日守护鹅', 614],
      ['梅秋杨', '屿间笔录鹅', 616],
      ['石艺葳', '芽美路鹅', 621],
      ['王一丹', '针针鹅', 623],
      ['陈豪辉', '心动情报鹅', 617],
      ['吴欣欣', '线索拼盘鹅', 620],
      ['许云麒', '抗冻鹅', 618]
    ].map(([person, name, file]) => ({ name, person, image: `assets/geese/微信图片_20261030204555_${file}_2470.png` }))
  ],
  themes: [
    { day: 1, title: 'Day1 · 一句话求职困难', intro: '用一句话吐槽近期求职困难，再选一选当前精神状态。', instructions: '投稿用于次日求职讨论的归类与案例选择，不承诺逐条回应。', buttonLabel: '发射发疯电波（投出漂流瓶）', formUrl: 'https://my.feishu.cn/share/base/form/shrcnJley22Vcba1UfWacf5uSCh', formReady: true },
    { day: 2, title: 'Day2 · 购物纠结与优惠难题', intro: '想买什么、为什么需要，又在纠结什么？', instructions: '投稿用于Day3「心愿买得岛」的案例讨论与方案比较，不承诺逐条回应，最终选择由你决定。', buttonLabel: '投出购物漂流瓶', formUrl: 'https://my.feishu.cn/share/base/form/shrcn3NCWfXR6qS8DejB5hS5NSg', formReady: true }
  ],
  post: {
    formUrl: 'https://my.feishu.cn/share/base/form/shrcnh3cUjq6Oqvi5lEt7By36nf',
    formReady: true,
    rules: '图片和留言通过飞书提交。经审核并获得公开同意后收录，不会即时上墙。',
    intro: '寄出一张 AI 二创图片，留一句想对旅伴说的话。',
    ending: '愿意的话，可以在群里分享这次相遇的感受。也可以再抽一张，或回到地图继续旅行。'
  },
  // 仅添加已审核且获得公开许可的作品：{ image: 'assets/作品.jpg', message: '留言', author: '公开署名' }
  postcards: [
    {
      "image": "assets/postcards/camp-02.webp",
      "message": "冬天又要来了\n分享一个去年在阿勒泰的日照金山给你\n把好运传递给你"
    },
    {
      "image": "assets/postcards/camp-03.webp",
      "message": "送你济州岛橘子味的日落嘿嘿～"
    },
    {
      "image": "assets/postcards/camp-04.webp",
      "message": "它叫杰森（妈生微笑唇版\n没有烦恼的小萨摩耶\n笑一笑吧\n今天的你也不要有烦恼"
    },
    {
      "image": "assets/postcards/camp-05.webp",
      "message": "嗨 ee你好\n我素小满 很高兴认识你\n要不要请我吃猫条😋"
    },
    {
      "image": "assets/postcards/camp-06.webp",
      "message": "照片右侧为腾讯滨海大厦，祝大家都能收获鹅厂 offer。"
    },
    {
      "image": "assets/postcards/camp-07.webp",
      "message": "多去看看路边的小猫吧！说不定它会给你惊喜！"
    },
    {
      "image": "assets/postcards/camp-08.webp",
      "message": "请大家看玉龙雪山上的彩云"
    },
    {
      "image": "assets/postcards/camp-09.webp",
      "message": "看到日照金山，会幸运一整年！祝大家接下来顺顺利利"
    },
    {
      "image": "assets/postcards/camp-10.webp",
      "message": "之前去腾讯参观啦！大家鹅厂见"
    },
    {
      "image": "assets/postcards/camp-11.webp",
      "message": "在城堡下面看日落——最好的解压方式！\n压力太大就回“家”玩一天"
    },
    {
      "image": "assets/postcards/camp-12.webp",
      "message": "古楼旁，两株柏树守着一方晴空。"
    },
    {
      "image": "assets/postcards/camp-13.webp",
      "message": "和达菲 say hi～"
    },
    {
      "image": "assets/postcards/camp-14.webp",
      "message": "送你呼伦贝尔的秋"
    },
    {
      "image": "assets/postcards/camp-15.webp",
      "message": "万圣节遇到的！特别有意思啊"
    },
    {
      "image": "assets/postcards/camp-16.webp",
      "message": "祝大家在鹅创营收获满满！"
    },
    {
      "image": "assets/postcards/camp-17.webp",
      "message": "鹅要过生日啦～"
    },
    {
      "image": "assets/postcards/camp-18.webp",
      "message": "给你看香港的街景\n是不是很有港风电影的感觉嘞～"
    },
    {
      "image": "assets/postcards/camp-19.webp",
      "message": "祝你token管够！"
    },
    {
      "image": "assets/postcards/camp-20.webp",
      "message": "咪 祝人开心"
    },
    {
      "image": "assets/postcards/camp-21.webp",
      "message": "啦啦啦黑猫警长"
    },
    {
      "image": "assets/postcards/camp-22.webp",
      "message": "一起登糕！"
    },
    {
      "image": "assets/postcards/camp-23.webp",
      "message": "这只大馋猫，我给它买了份炸酥肉，它只吃肉不吃皮，后面才知道是烧烤店老板的猫，过的太滋润了!"
    },
    {
      "image": "assets/postcards/camp-24.webp",
      "message": "企鹅企鹅🐧"
    }
  ],
  outcomes: [
    '鹅际关系指南', '求职鹅指南', '买得岛AI补给避坑指南', '不期鹅遇·冒险者漂流邮册', '迷雾议事录'
  ].map(title => ({ title, cover: '', description: '旅途的收获正在整理，稍后在这里与你见面。', file: '', type: 'image' }))
};
