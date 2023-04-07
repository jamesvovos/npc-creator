import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NavigationBar from "@/components/navigationBar";
import DataTable from "@/components/dataTable";
// import CustomTable from "@/components/customTable";
import Dashboard from "./dashboard";
import Intents from "@/components/intentsTable";
// import Intents from "./intents";
import "antd/dist/reset.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <Dashboard /> */}
        <NavigationBar />
      </main>
    </>
  );
}
