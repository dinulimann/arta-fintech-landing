import { Container, Reveal } from "../components/ui";
import StoreButtons from "../components/StoreButtons";
import { HomeScreen, PhoneFrame } from "../components/Phone";

export default function Download() {
  return (
    <section id="download" className="pb-28">
      <Container>
        <Reveal>
          <div className="noise relative overflow-hidden rounded-[2.5rem] border border-edge bg-[radial-gradient(90%_120%_at_10%_0%,rgb(181_242_61/0.25),transparent_50%),radial-gradient(80%_100%_at_100%_100%,rgb(34_211_238/0.25),transparent_55%),#0b0d14] px-7 pt-14 sm:px-14 sm:pt-16">
            <div className="grid items-end gap-10 lg:grid-cols-2">
              <div className="pb-14">
                <h2 className="text-4xl font-bold tracking-[-0.03em] text-balance sm:text-6xl">Your calmer month starts today.</h2>
                <p className="mt-5 max-w-md text-lg text-fog">Open an account in 3 minutes with your KTP. No minimum balance, no monthly fee.</p>
                <div className="mt-8"><StoreButtons /></div>
              </div>
              <div className="mx-auto -mb-40 hidden sm:block">
                <PhoneFrame><HomeScreen /></PhoneFrame>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
