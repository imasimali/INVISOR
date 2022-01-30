import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                  <link rel="stylesheet" href="loginstyles.css" type="text/css" />
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                  <link rel='stylesheet' href="https://fonts.cdnfonts.com/css/comic-neue-angular"/>
                  <link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Caudex"/>
                  <link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Quicksand"/>
                  <link rel='stylesheet' href="https://fonts.googleapis.com/css?family=Comic Neue"/>
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>   
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;