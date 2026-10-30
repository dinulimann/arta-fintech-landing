import { Container, Logo } from "../components/ui";

export default function Footer() {
  return (
    <footer className="border-t border-edge py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-fog">Personal finance for Indonesia: spend, save and share without the stress.</p>
        </div>
        <p className="max-w-md text-sm text-fog md:text-right">
          Arta is a fictional product, designed and built by{" "}
          <a href="https://github.com/dinulimann" className="font-semibold text-white hover:text-lime">Dinul Iman</a> as a portfolio piece. It is not a bank or a licensed financial service; names, reviews and figures are illustrative.
        </p>
      </Container>
    </footer>
  );
}
