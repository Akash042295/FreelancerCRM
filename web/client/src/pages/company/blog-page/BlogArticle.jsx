
import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock, CalendarDays } from "lucide-react";

import N from "../../../components/parts/Navbar.jsx";
import F from "../../../components/parts/Footer.jsx";
import { posts } from '../../../mock/mockArticles.js';

const BlogArticle = () => {
  const { id } = useParams();

  const post = posts.find((item) => item.id === id);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <N />

      <main className="min-h-screen bg-[#0f0f0f] text-white">
        {/* ARTICLE HERO */}
        <section className="border-b border-[#2a2a2a] px-6 py-16 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/blog"
              className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-orange-500"
            >
              <ArrowLeft size={17} />
              Back to Blog
            </Link>

            <div className="mb-5">
              <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-500">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="mt-6 text-base leading-8 text-gray-400 sm:text-lg">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-[#2a2a2a] pt-6">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{post.author}</p>
                  <p className="text-xs text-gray-500">Article author</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CalendarDays size={16} />
                {post.date}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock size={16} />
                {post.read}
              </div>
            </div>
          </div>
        </section>

        {/* ARTICLE CONTENT */}
        <section className="px-6 py-14 sm:px-10 lg:px-20">
          <article className="mx-auto max-w-4xl">
            <img
              src={post.img}
              alt={post.title}
              className="mb-10 max-h-120 w-full rounded-2xl border border-[#2a2a2a] object-cover"
            />

            <div className="max-w-3xl space-y-6 text-base leading-8 text-gray-300">
              <h2 className="text-2xl font-bold text-white">
                Introduction
              </h2>

              <p>{post.excerpt}</p>

              {post.content?.length > 0 ? (
                post.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p className="text-gray-400">
                  This article introduces the topic and its relevance to
                  modern CRM workflows. Add the complete article content
                  to this post's content array to display the full
                  published article here.
                </p>
              )}
            </div>

            <div className="mt-12 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-7 sm:p-9">
              <h2 className="text-2xl font-bold">
                Enjoyed this article?
              </h2>

              <p className="mt-3 text-gray-400">
                Explore more insights on sales, product development
                and business growth.
              </p>

              <Link
                to="/blog"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-500 transition-colors hover:text-orange-400"
              >
                Explore more articles
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </article>
        </section>
      </main>

      <F />
    </>
  );
};

export default BlogArticle;
