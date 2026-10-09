"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BsLinkedin } from "react-icons/bs";
import { FaGithubSquare, FaTwitter } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import nachoWebp from "@/public/nacho.webp";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <Image
              src={nachoWebp}
              alt="Nacho portrait"
              width="192"
              height="192"
              quality="95"
              priority={true}
              className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
            />
          </motion.div>

          <motion.span
            className="absolute bottom-0 right-0 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className="mb-6 mt-6 px-4 text-3xl font-bold !leading-[1.2] sm:text-5xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-bold">Nacho González-Garilleti</span>
      </motion.h1>

      <motion.div
        className="mb-6 px-4 mx-auto max-w-[38rem] text-xl font-medium !leading-[1.5] text-gray-800 sm:text-2xl dark:text-white/90"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-semibold">
          Software Engineer with over 9 years of experience. I love to write
          code and design software for people and companies.
        </span>
      </motion.div>

      <motion.div
        className="mb-6 px-4 mx-auto max-w-[38rem] text-base !leading-[1.7] text-gray-700 sm:text-lg dark:text-white/70"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span>
          Currently technical lead at OpenVPN, working on secure networking and
          AI agents: per-customer certificate authorities, device identity and
          OAuth2/OIDC access, plus LangGraph agents on Vertex AI with human
          approval before they act.
        </span>
      </motion.div>

      <motion.div
        className="mb-6 px-4 mx-auto max-w-[38rem] text-base !leading-[1.7] text-gray-700 sm:text-lg dark:text-white/70"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="italic text-gray-500 dark:text-white/50">
          "Success is not assured, failures either."
        </span>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <a
          className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://www.linkedin.com/in/nachogonzalezgarilleti/"
          target="_blank"
        >
          <BsLinkedin />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://github.com/Nachox07/"
          target="_blank"
        >
          <FaGithubSquare />
        </a>
        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://twitter.com/nachox07"
          target="_blank"
        >
          <FaTwitter />
        </a>
      </motion.div>
    </section>
  );
}
