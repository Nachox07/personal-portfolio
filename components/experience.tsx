"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { experienceData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

export default function Experience() {
	const { ref } = useSectionInView("Experience", 0.5);

	return (
		<section
			ref={ref}
			id="experience"
			className="scroll-mt-28 mb-28 w-full max-w-[42rem]"
		>
			<SectionHeading>My experience</SectionHeading>
			<ol className="flex flex-col gap-6">
				{experienceData.map((item, index) => (
					<motion.li
						key={index}
						className="bg-gray-100 border border-black/5 rounded-lg px-5 py-5 sm:px-8 sm:py-6 dark:bg-white/10 dark:text-white"
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.05 * index }}
					>
						<h3 className="text-xl font-semibold">{item.role}</h3>
						<p className="text-gray-700 dark:text-white/70">
							<span className="font-medium">{item.company}</span>
							<span className="mx-2 text-gray-400 dark:text-white/40">·</span>
							<span className="text-sm">{item.period}</span>
						</p>
						<p className="mt-3 leading-relaxed text-gray-700 dark:text-white/70">
							{item.description}
						</p>
					</motion.li>
				))}
			</ol>
		</section>
	);
}
