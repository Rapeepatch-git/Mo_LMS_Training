import type { Quiz } from '@/types/quiz';

export const QUIZZES: Quiz[] = [
  {
    id: 'q-vi-001',
    courseId: 'c-001',
    sectionId: 's-001',
    title: 'ทดสอบความเข้าใจ: หลักการลงทุนเบื้องต้น',
    description: 'ทดสอบว่าคุณเข้าใจแนวคิดพื้นฐานของ Value Investing ดีแค่ไหน — ต้องได้ 70% ขึ้นไปเพื่อผ่าน',
    passingScore: 70,
    timeLimit: 600, // 10 minutes
    questions: [
      {
        id: 'q1',
        type: 'single',
        text: 'Benjamin Graham ถือว่าเป็น "บิดา" ของแนวคิดใด?',
        choices: [
          { id: 'a', text: 'Technical Analysis' },
          { id: 'b', text: 'Value Investing' },
          { id: 'c', text: 'Momentum Investing' },
          { id: 'd', text: 'Index Investing' },
        ],
        correctIds: ['b'],
        explanation:
          'Benjamin Graham เป็นผู้บุกเบิกแนวคิด Value Investing และเป็นอาจารย์ของ Warren Buffett ผลงานสำคัญคือหนังสือ "The Intelligent Investor"',
      },
      {
        id: 'q2',
        type: 'single',
        text: '"Margin of Safety" หมายความว่าอะไรในบริบทของ Value Investing?',
        choices: [
          { id: 'a', text: 'กำไรขั้นต่ำที่บริษัทต้องทำได้' },
          { id: 'b', text: 'ส่วนต่างระหว่างราคาหุ้นกับมูลค่าที่แท้จริง' },
          { id: 'c', text: 'ขีดจำกัดของ leverage ที่นักลงทุนใช้ได้' },
          { id: 'd', text: 'เปอร์เซ็นต์ของพอร์ตที่ถือเป็นเงินสด' },
        ],
        correctIds: ['b'],
        explanation:
          'Margin of Safety คือส่วนต่างระหว่างราคาตลาด (ที่ต่ำกว่า) กับมูลค่าที่แท้จริง (Intrinsic Value) ของหุ้น — ยิ่งส่วนต่างมาก ยิ่งปลอดภัย',
      },
      {
        id: 'q3',
        type: 'single',
        text: 'อัตราส่วนใดที่ Value Investor มักใช้วัด "ความถูก" ของหุ้นเทียบกับกำไร?',
        choices: [
          { id: 'a', text: 'P/B Ratio (Price-to-Book)' },
          { id: 'b', text: 'P/E Ratio (Price-to-Earnings)' },
          { id: 'c', text: 'D/E Ratio (Debt-to-Equity)' },
          { id: 'd', text: 'ROE (Return on Equity)' },
        ],
        correctIds: ['b'],
        explanation:
          'P/E Ratio แสดงว่านักลงทุนยอมจ่ายเงินกี่บาทต่อกำไร 1 บาท หุ้น P/E ต่ำ (เทียบกับอุตสาหกรรม) อาจบ่งชี้ว่าราคาต่ำกว่ามูลค่าจริง',
      },
      {
        id: 'q4',
        type: 'true-false',
        text: 'Warren Buffett แนะนำให้นักลงทุนรายย่อยเลือกหุ้นรายตัวมากกว่าลงทุนใน Index Fund',
        choices: [
          { id: 'true', text: 'จริง' },
          { id: 'false', text: 'ไม่จริง' },
        ],
        correctIds: ['false'],
        explanation:
          'Buffett กล่าวหลายครั้งว่านักลงทุนรายย่อยส่วนใหญ่จะได้ผลตอบแทนดีกว่าถ้าลงทุนใน Low-cost Index Fund แทนการเลือกหุ้นรายตัวเอง',
      },
      {
        id: 'q5',
        type: 'multiple',
        text: 'ข้อใดบ้างเป็นปัจจัยที่ Value Investor มักพิจารณาก่อนซื้อหุ้น? (เลือกทุกข้อที่ถูก)',
        choices: [
          { id: 'a', text: 'มูลค่าที่แท้จริง (Intrinsic Value)' },
          { id: 'b', text: 'กราฟราคาระยะสั้น' },
          { id: 'c', text: 'ความแข็งแกร่งของธุรกิจ (Economic Moat)' },
          { id: 'd', text: 'ความสามารถของผู้บริหาร' },
        ],
        correctIds: ['a', 'c', 'd'],
        explanation:
          'Value Investor เน้นปัจจัยพื้นฐาน: Intrinsic Value, ความได้เปรียบเชิงแข่งขัน (Moat) และคุณภาพผู้บริหาร — ไม่ได้ใช้กราฟราคาระยะสั้น',
      },
      {
        id: 'q6',
        type: 'single',
        text: '"Mr. Market" ในอุปมานิทัศน์ของ Graham หมายถึงอะไร?',
        choices: [
          { id: 'a', text: 'ผู้เชี่ยวชาญที่คุณควรเชื่อถือเสมอ' },
          { id: 'b', text: 'ราคาตลาดเฉลี่ยของดัชนีหุ้น' },
          { id: 'c', text: 'ตลาดหุ้นที่มีอารมณ์ขึ้นลงตลอดเวลา' },
          { id: 'd', text: 'นักลงทุนสถาบันรายใหญ่' },
        ],
        correctIds: ['c'],
        explanation:
          'Mr. Market เป็นอุปมาของ Graham — เหมือนหุ้นส่วนที่มีอารมณ์แปรปรวน บางวันขายถูกมาก บางวันแพงมาก นักลงทุนที่ดีควรใช้ประโยชน์จากอารมณ์นี้ ไม่ใช่ถูกมันพัดพาไป',
      },
      {
        id: 'q7',
        type: 'single',
        text: 'Intrinsic Value ของหุ้นคำนวณจากอะไรเป็นหลักในวิธี DCF?',
        choices: [
          { id: 'a', text: 'ราคาหุ้นปัจจุบัน' },
          { id: 'b', text: 'กระแสเงินสดในอนาคตที่คิดลดกลับมาปัจจุบัน' },
          { id: 'c', text: 'ยอดขายรวมของบริษัทใน 12 เดือนที่ผ่านมา' },
          { id: 'd', text: 'มูลค่าทรัพย์สินสุทธิตามบัญชี' },
        ],
        correctIds: ['b'],
        explanation:
          'Discounted Cash Flow (DCF) คิดมูลค่าจากการประมาณกระแสเงินสดอิสระ (Free Cash Flow) ในอนาคต แล้วคิดลด (Discount) กลับมาเป็นมูลค่าปัจจุบันด้วย Discount Rate ที่เหมาะสม',
      },
      {
        id: 'q8',
        type: 'true-false',
        text: 'นักลงทุนแบบ Value Investing ควรซื้อหุ้นที่มี P/E สูง เพราะแสดงถึงการเติบโตสูง',
        choices: [
          { id: 'true', text: 'จริง' },
          { id: 'false', text: 'ไม่จริง' },
        ],
        correctIds: ['false'],
        explanation:
          'Value Investing มองหาหุ้นที่ราคาต่ำกว่ามูลค่าจริง หุ้น P/E สูงมักหมายความว่าตลาดคาดการณ์การเติบโตสูงและราคาก็สะท้อนสิ่งนั้นแล้ว — ไม่ใช่ "ถูก" ในมุมมองของ Value Investor',
      },
      {
        id: 'q9',
        type: 'single',
        text: 'หนังสือเล่มใดของ Benjamin Graham ที่ Warren Buffett เรียกว่า "หนังสือการลงทุนที่ดีที่สุดเท่าที่เคยเขียนมา"?',
        choices: [
          { id: 'a', text: 'Security Analysis' },
          { id: 'b', text: 'The Intelligent Investor' },
          { id: 'c', text: 'Common Stocks and Uncommon Profits' },
          { id: 'd', text: 'One Up On Wall Street' },
        ],
        correctIds: ['b'],
        explanation:
          '"The Intelligent Investor" (1949) คือหนังสือที่ Warren Buffett แนะนำและยกย่องมากที่สุด — เป็นคัมภีร์ของ Value Investing',
      },
      {
        id: 'q10',
        type: 'multiple',
        text: 'ข้อใดบ้างเป็นจุดแข็งของ "Economic Moat" หรือ "ความได้เปรียบเชิงแข่งขัน"? (เลือกทุกข้อที่ถูก)',
        choices: [
          { id: 'a', text: 'ต้นทุนการผลิตต่ำกว่าคู่แข่ง (Cost Advantage)' },
          { id: 'b', text: 'ราคาหุ้นที่ต่ำกว่า P/E ของตลาด' },
          { id: 'c', text: 'แบรนด์ที่แข็งแกร่ง (Intangible Assets)' },
          { id: 'd', text: 'ต้นทุนการเปลี่ยนผู้ให้บริการสูง (Switching Costs)' },
        ],
        correctIds: ['a', 'c', 'd'],
        explanation:
          'Economic Moat วัดจากปัจจัยเชิงธุรกิจ เช่น ต้นทุนต่ำ, แบรนด์, Switching Costs, Network Effects, Efficient Scale — ราคา P/E ไม่ใช่ตัววัด Moat',
      },
    ],
  },
  {
    id: 'q-vi-002',
    courseId: 'c-001',
    sectionId: 's-002',
    title: 'ทดสอบความเข้าใจ: การวิเคราะห์งบการเงิน',
    description: 'ทดสอบความสามารถอ่านงบการเงินเบื้องต้น — ต้องได้ 70% ขึ้นไปเพื่อผ่าน',
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        type: 'single',
        text: 'งบการเงินใดแสดงฐานะการเงิน ณ วันใดวันหนึ่ง (ไม่ใช่ช่วงเวลา)?',
        choices: [
          { id: 'a', text: 'งบกำไรขาดทุน (Income Statement)' },
          { id: 'b', text: 'งบกระแสเงินสด (Cash Flow Statement)' },
          { id: 'c', text: 'งบดุล / งบแสดงฐานะการเงิน (Balance Sheet)' },
          { id: 'd', text: 'งบแสดงการเปลี่ยนแปลงส่วนของผู้ถือหุ้น' },
        ],
        correctIds: ['c'],
        explanation:
          'Balance Sheet แสดงภาพ "ณ จุดหนึ่ง" ว่าบริษัทมีสินทรัพย์ หนี้สิน และส่วนผู้ถือหุ้นเท่าไร — เหมือนถ่ายรูปฐานะการเงินในวันนั้น',
      },
      {
        id: 'q2',
        type: 'single',
        text: 'ROE (Return on Equity) คำนวณจากสูตรใด?',
        choices: [
          { id: 'a', text: 'กำไรสุทธิ ÷ รายได้รวม × 100' },
          { id: 'b', text: 'กำไรสุทธิ ÷ ส่วนผู้ถือหุ้น × 100' },
          { id: 'c', text: 'กำไรสุทธิ ÷ สินทรัพย์รวม × 100' },
          { id: 'd', text: 'รายได้รวม ÷ สินทรัพย์รวม × 100' },
        ],
        correctIds: ['b'],
        explanation:
          'ROE = กำไรสุทธิ ÷ ส่วนผู้ถือหุ้นเฉลี่ย × 100 วัดว่าบริษัทสร้างผลตอบแทนจากเงินของผู้ถือหุ้นได้ดีแค่ไหน',
      },
      {
        id: 'q3',
        type: 'true-false',
        text: 'บริษัทที่มีกำไรสุทธิสูงทุกปี แต่มีกระแสเงินสดติดลบจากการดำเนินงาน ถือว่าน่าลงทุน',
        choices: [
          { id: 'true', text: 'จริง' },
          { id: 'false', text: 'ไม่จริง' },
        ],
        correctIds: ['false'],
        explanation:
          'กำไรสุทธิสูงแต่กระแสเงินสดติดลบเป็นสัญญาณเตือน — อาจเป็นการตั้งสำรองที่ไม่สมเหตุสมผล หรือปัญหาการเก็บเงินจากลูกค้า Warren Buffett มักดู Free Cash Flow มากกว่ากำไรทางบัญชี',
      },
    ],
  },
];

export function getQuizById(id: string): Quiz | undefined {
  return QUIZZES.find((q) => q.id === id);
}

export function getQuizzesByCourse(courseId: string): Quiz[] {
  return QUIZZES.filter((q) => q.courseId === courseId);
}
