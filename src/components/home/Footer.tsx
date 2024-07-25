export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-20 md:px-12 sm:px-4">
      <section className="flex justify-between items-center">
        <img src="/logo-w.png" className="w-40 object-contain" />
        <section className="flex gap-4">
          <a
            href="#aboutus"
            className="hover:underline hover:text-mainGreen text-m"
          >
            About Us
          </a>
          <a
            href="#howitworks"
            className="hover:underline hover:text-mainGreen text-m"
          >
            How It Works
          </a>
          <a
            href="#services"
            className="hover:underline hover:text-mainGreen text-m"
          >
            Services
          </a>
          <a
            href="#contactus"
            className="hover:underline hover:text-mainGreen text-m"
          >
            Contact Us
          </a>
        </section>
      </section>
      <section className="text-center mt-8">
        <p className="text-sm">&copy; 2024 All rights reserved.</p>
      </section>
    </footer>
  );
}
