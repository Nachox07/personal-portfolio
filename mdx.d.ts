// Every case-study MDX file exports its metadata next to the default component.
declare module "*.mdx" {
	export const meta: import("./lib/case-study-types").CaseStudyMeta;
}
