import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loading from "../../components/Loading"; // Import the Loading component

const Settings = () => {
  const [reminder, setReminder] = useState("");
  const [loading, setLoading] = useState<{ status: boolean; message: string }>({
    status: false,
    message: "",
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSetReminder = async () => {
    setLoading({ status: true, message: "Setting Reminder..." });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (Notification.permission === "granted") {
      new Notification("Task Reminder", {
        body: `Reminder: ${reminder}`,
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Task Reminder", {
            body: `Reminder: ${reminder}`,
          });
        }
      });
    }
    setLoading({ status: false, message: "" });
  };

  if (!isMounted || loading.status) {
    return (
      <Loading message={loading.message ? loading.message : "Loading..."} />
    );
  }

  return (
    <Layout>
      <div className="max-w-md my-20 mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <Input
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          placeholder="Set Reminder"
        />
        <Button onClick={handleSetReminder} className="w-full">
          Set Reminder
        </Button>
      </div>
    </Layout>
  );
};

export default Settings;
