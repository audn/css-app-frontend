import { Button } from '../common/components/Buttons';
import Alpha from '../common/components/layout/headings/Alpha';
import P from '../common/components/layout/headings/P';
import Link from '../common/components/layout/Link';
import SectionSeparator from '../common/components/layout/SectionSeparator';
import { DefaultLayout } from '../common/layouts/Default';

function About() {
  return (
    <DefaultLayout>
      <div className="max-w-2xl mx-auto sm:mt-12">
        <div className="flex">
          <Button.Secondary
            className="flex mb-8 text-on-100"
            label="Back"
            route="/"
            icon="fa-regular fa-arrow-left"
          />
        </div>
        <Alpha>About</Alpha>
        <P className="!text-lg text-on-150 !leading-10 mt-10">
          <div>
            <SectionSeparator title="Acquisition" />I{' '}
            <i>&quot;accidentally&quot;</i> typed in &quot;css.app&quot; in the
            address-bar and <i>&quot;accidentally&quot;</i> entered my e-mail in
            the <strong>Get a price estimate on this domain</strong> field.
          </div>
          <div>
            <SectionSeparator title="About me" />
            I&apos;m really just another frontend developer, but I&apos;ve been
            planning to learn backend for a long time.
          </div>
          <div>
            This project gave me the opportunity to do so - so I can proudly say
            that this is my first full stack project.
          </div>
        </P>
        <div className="flex mt-12 space-x-5">
          <Link
            href="https://twitter.com/tweetaudun"
            className="text-blue-500 hover:text-blue-400"
          >
            <i className="text-4xl fa-brands fa-twitter" />
          </Link>
          <Link
            href="https://twitch.com/audn1"
            className="text-indigo-500 hover:text-indigo-400"
          >
            <i className="text-4xl fa-brands fa-twitch" />
          </Link>
          <Link
            href="https://github.com/audn"
            className="text-white hover:text-gray-500"
          >
            <i className="text-4xl fa-brands fa-github" />
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default About;
