import "@mantine/core/styles.css";
import CardItem from "@/src/component-common/cardItem/CardItem";
import "@/styles/reset.css";

export default function App({ Component, pageProps }: any) {
  const n = 50;
  return (
    <div className="cardItem">
      <CardItem></CardItem>
      <CardItem></CardItem>
    </div>
  );
}
