import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPost, formatDate } from '@/lib/blog';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Guardian Inbox`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white antialiased">
      {/* Nav */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-100 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <img src="/GuardianInboxLogo.png" alt="Guardian Inbox" className="h-[84px]" />
          </Link>
          <Link
            href="/pricing"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm shadow-sm"
          >
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* Cover */}
      <div className="bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center py-20 text-8xl">
        {post.coverEmoji}
      </div>

      {/* Article */}
      <article className="max-w-2xl mx-auto px-6 py-12">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Link
            href="/blog"
            className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors"
          >
            {post.category}
          </Link>
          <span className="text-xs text-slate-400">{post.readTime}</span>
          <span className="text-xs text-slate-300">·</span>
          <span className="text-xs text-slate-400">{formatDate(post.date)}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed mb-10 border-b border-slate-100 pb-10">
          {post.description}
        </p>

        {/* MDX content */}
        <div className="prose prose-slate prose-lg max-w-none
          prose-headings:font-extrabold prose-headings:text-slate-900
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-slate-600 prose-p:leading-relaxed
          prose-strong:text-slate-800
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-ul:text-slate-600 prose-li:marker:text-blue-400
          prose-hr:border-slate-200
          prose-blockquote:border-l-blue-400 prose-blockquote:text-slate-600 prose-blockquote:bg-slate-50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
        ">
          <MDXRemote source={post.content} />
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-slate-100">
          <Link href="/blog" className="text-slate-400 hover:text-slate-700 text-sm font-medium transition-colors">
            ← Back to all articles
          </Link>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-blue-600 px-6 py-16 text-center mt-8">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-3">Ready to protect your parent?</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            Start a free 7-day trial. No charge until day 8. Cancel anytime.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white hover:bg-blue-50 text-blue-600 font-bold px-8 py-3.5 rounded-xl transition-colors shadow-sm text-sm"
          >
            Compare plans →
          </Link>
        </div>
      </section>
    </main>
  );
}
