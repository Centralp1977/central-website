const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign } = require('docx');
const fs = require('fs');

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const thinBorder = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
const thinBorders = { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder };

const TW = 9026;

const labelCell = (text, width) => new TableCell({
  borders: noBorders,
  width: { size: width || 1800, type: WidthType.DXA },
  shading: { fill: "D9E2F3", type: ShadingType.CLEAR },
  verticalAlign: VerticalAlign.CENTER,
  margins: { top: 80, bottom: 80, left: 120, right: 120 },
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, font: "MS明朝", size: 22, bold: true })]
  })]
});

const lineCell = (width) => new TableCell({
  borders: { top: noBorder, bottom: thinBorder, left: noBorder, right: noBorder },
  width: { size: width, type: WidthType.DXA },
  margins: { top: 60, bottom: 60, left: 120, right: 120 },
  children: [new Paragraph({ children: [] })]
});

const headerCell = (text, width) => new TableCell({
  borders: thinBorders,
  width: { size: width, type: WidthType.DXA },
  shading: { fill: "D9E2F3", type: ShadingType.CLEAR },
  margins: { top: 80, bottom: 80, left: 80, right: 80 },
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, font: "MS明朝", size: 20, bold: true })]
  })]
});

const dataCell = (width, text) => new TableCell({
  borders: thinBorders,
  width: { size: width, type: WidthType.DXA },
  margins: { top: 60, bottom: 60, left: 80, right: 80 },
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: text || "", font: "MS明朝", size: 20 })]
  })]
});

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // タイトル
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 240 },
        children: [new TextRun({ text: "送　　り　　状", font: "MS明朝", size: 48, bold: true })]
      }),

      // 日付
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { after: 240 },
        children: [new TextRun({ text: "　　　　年　　　月　　　日", font: "MS明朝", size: 22 })]
      }),

      // 宛先＋自社情報
      new Table({
        width: { size: TW, type: WidthType.DXA },
        columnWidths: [4300, 300, 4426],
        borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideH: noBorder, insideV: noBorder },
        rows: [
          new TableRow({ children: [
            new TableCell({
              borders: noBorders,
              width: { size: 4300, type: WidthType.DXA },
              margins: { top: 0, bottom: 0, left: 0, right: 0 },
              children: [
                new Paragraph({
                  spacing: { after: 60 },
                  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" } },
                  children: [new TextRun({ text: "", font: "MS明朝", size: 22 })]
                }),
                new Paragraph({
                  spacing: { after: 120 },
                  children: [new TextRun({ text: "", font: "MS明朝", size: 22 })]
                }),
                new Paragraph({
                  children: [new TextRun({ text: "　　　　　　　　　　　　　　　 御中", font: "MS明朝", size: 28, bold: true })]
                }),
              ]
            }),
            new TableCell({ borders: noBorders, width: { size: 300, type: WidthType.DXA }, children: [new Paragraph({})] }),
            new TableCell({
              borders: { ...noBorders, left: { style: BorderStyle.SINGLE, size: 4, color: "999999" } },
              width: { size: 4426, type: WidthType.DXA },
              margins: { top: 0, bottom: 0, left: 200, right: 0 },
              children: [
                new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "セントラル印刷株式会社", font: "MS明朝", size: 24, bold: true })] }),
                new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "〒112-0013 東京都文京区音羽1-20-14", font: "MS明朝", size: 18 })] }),
                new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "MBS音羽ビル2F（本社）", font: "MS明朝", size: 18 })] }),
                new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "TEL: 03-5981-8911　FAX: 03-5981-8912", font: "MS明朝", size: 18 })] }),
                new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "〒162-0818 東京都新宿区築地町13", font: "MS明朝", size: 18 })] }),
                new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "赤城ビル3F（工場/営業部）", font: "MS明朝", size: 18 })] }),
                new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: "TEL: 03-3267-4441　FAX: 03-3267-4440", font: "MS明朝", size: 18 })] }),
                new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: "担当：", font: "MS明朝", size: 20 })] }),
              ]
            }),
          ] }),
        ]
      }),

      new Paragraph({ spacing: { before: 280, after: 160 }, children: [
        new TextRun({ text: "平素より格別のご高配を賜り、厚く御礼申し上げます。", font: "MS明朝", size: 22 })
      ]}),
      new Paragraph({ spacing: { after: 300 }, children: [
        new TextRun({ text: "下記の通りお送りいたします。ご確認のほど、よろしくお願い申し上げます。", font: "MS明朝", size: 22 })
      ]}),

      // 案件情報
      new Table({
        width: { size: TW, type: WidthType.DXA },
        columnWidths: [1800, 7226],
        rows: [
          new TableRow({ height: { value: 500 }, children: [labelCell("案　件　名", 1800), lineCell(7226)] }),
          new TableRow({ height: { value: 500 }, children: [labelCell("納　品　物", 1800), lineCell(7226)] }),
        ]
      }),

      new Paragraph({ spacing: { before: 300, after: 120 }, children: [
        new TextRun({ text: "■ 同梱物一覧", font: "MS明朝", size: 24, bold: true })
      ]}),

      // 同梱物テーブル
      new Table({
        width: { size: TW, type: WidthType.DXA },
        columnWidths: [400, 4826, 1200, 1200, 1400],
        rows: [
          new TableRow({ children: [
            headerCell("No.", 400),
            headerCell("品　　　名", 4826),
            headerCell("数　量", 1200),
            headerCell("単　位", 1200),
            headerCell("備　考", 1400),
          ]}),
          ...[1,2,3,4,5,6,7,8].map(n => new TableRow({ height: { value: 480 }, children: [
            dataCell(400, String(n)),
            new TableCell({ borders: thinBorders, width: { size: 4826, type: WidthType.DXA }, margins: { top: 60, bottom: 60, left: 120, right: 80 }, children: [new Paragraph({})] }),
            dataCell(1200),
            dataCell(1200),
            dataCell(1400),
          ]}))
        ]
      }),

      new Paragraph({ spacing: { before: 320, after: 120 }, children: [
        new TextRun({ text: "■ 備考・連絡事項", font: "MS明朝", size: 24, bold: true })
      ]}),
      new Table({
        width: { size: TW, type: WidthType.DXA },
        columnWidths: [TW],
        rows: [
          new TableRow({ height: { value: 1400 }, children: [
            new TableCell({
              borders: thinBorders,
              width: { size: TW, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [new Paragraph({})]
            })
          ] }),
        ]
      }),

      new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { before: 200 }, children: [
        new TextRun({ text: "以　上", font: "MS明朝", size: 22 })
      ]}),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("送り状_セントラル印刷.docx", buffer);
  console.log("Done");
});
