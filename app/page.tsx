import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SelectedWork from "@/components/selected-work";

export default function Home() {
	return (
		<main id="main" className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 sm:px-8">
			<Intro />
			<SelectedWork />
			<Experience />
			<Projects />
		</main>
	);
}
