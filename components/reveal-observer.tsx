"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Marks [data-reveal] elements with .is-in once they scroll into view, so CSS can
// fade them in. Content is visible without JavaScript: the hidden state only applies
// once this has added .js-reveal to <html>, and never under reduced motion.
export default function RevealObserver() {
	const pathname = usePathname();

	useEffect(() => {
		const root = document.documentElement;
		const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
		if (!("IntersectionObserver" in window)) {
			items.forEach((el) => el.classList.add("is-in"));
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					entry.target.classList.add("is-in");
					observer.unobserve(entry.target);
				}
			},
			{ rootMargin: "0px 0px -10% 0px" }
		);
		items.forEach((el) => observer.observe(el));
		root.classList.add("js-reveal");
		return () => observer.disconnect();
	}, [pathname]);

	return null;
}
