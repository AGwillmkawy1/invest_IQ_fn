import Loading from "react-loading";

export default function LoadingSection() {
  return (
    <section className="flex items-center justify-center h-screen w-full">
      <Loading type="spin" color="#06A67E" />
    </section>
  );
}
