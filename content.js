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
      image: 'assets/postcards/bus-stop-sample.png',
      message: '公交还没来，先看了十分钟的海。\n这张长椅分你一半。',
      author: '鹅小创（示例署名）',
      note: 'AI生成的体验明信片，非真实群友投稿。',
      demo: true
    }
  ],
  outcomes: [
    '鹅际关系指南', '求职鹅指南', '买得岛AI补给避坑指南', '不期鹅遇·冒险者漂流邮册', '迷雾议事录'
  ].map(title => ({ title, cover: '', description: '旅途的收获正在整理，稍后在这里与你见面。', file: '', type: 'image' }))
};
