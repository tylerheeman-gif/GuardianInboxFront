import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/blog';

export const metadata = {
  title: 'Blog | Guardian Inbox',
  description: 'Tips, guides, and scam awareness resources to help protect your aging parents online.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

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

      {/* Header */}
      <section className="bg-slate-50 border-b border-slate-100 px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Guardian Inbox Blog</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Protect the people you love
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Scam awareness, family safety tips, and guides to help you keep your aging parents safe online.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-slate-400">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2">
              {posts.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
                >
                  {/* Cover */}
                  <div className="bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center h-40 text-6xl">
                    {post.coverEmoji}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Category + read time */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-400">{post.readTime}</span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <span className="text-xs text-slate-400">{formatDate(post.date)}</span>
                      <span className="text-sm font-semibold text-blue-600 group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 px-6 py-16 text-center">
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
