import PdfPrinter from "pdfmake";

export const getPdfReadableStream = (user) => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
    },
  };

  const printer = new PdfPrinter(fonts);
  console.log("blogPost.title: ", user.name);
  const docDefinition = {
    content: [
      {
        text: user.name,
        style: "header",
        alignment: "center",
        fontSize: 28,
      },
      "\n\n",
      {
        alignment: "justify",
        columns: [
          {
            width: 150,
            text: "experiences role: " + user.experiences[0].role,
          },
          {
            width: 150,
            text: "Category: " + user.experiences[0].company,
          },
        ],
      },
    ],
  };

  console.log("content image: ", docDefinition.content);

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition);
  pdfReadableStream.end();

  return pdfReadableStream;
};
