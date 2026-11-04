import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";

export default function Home() {
	return (
		<main id="main" className="mx-auto w-full max-w-5xl px-4 sm:px-8">
			<Intro />
			<Experience />
			<Projects />
		</main>
	);
}
