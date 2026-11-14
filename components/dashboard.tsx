"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  FileText,
  Home,
  Lightbulb,
  Mic2,
  Play,
  Settings,
  Target,
  TrendingUp,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getStored, SessionResult } from "@/lib/storage";

export function Dashboard() {
  const [results, setResults] = useState<SessionResult[]>([]);

  useEffect(() => {
    setResults(
      getStored<SessionResult[]>("interviewprep_results", [])
    );
  }, []);

  const avg = results.length
    ? Math.round(
        results.reduce((total, result) => total + result.score, 0) /
          results.length
      )
    : 0;

  const answered = results.reduce(
    (total, result) => total + result.answered,
    0
  );

  const weeklyActivity = useMemo(() => {
    const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

    return days.map((day) => ({
      day,
      value: 0,
    }));
  }, []);

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: Home,
      active: true,
    },
    {
      label: "Practice room",
      href: "/practice",
      icon: Mic2,
    },
    {
      label: "My progress",
      href: "/progress",
      icon: TrendingUp,
    },
    {
      label: "Topics",
      href: "/topics",
      icon: BookOpen,
    },
    {
      label: "Docs & notes",
      href: "/notes",
      icon: FileText,
    },
  ];

  return (
    <div className="dashboard-shell">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Mic2 size={19} />
          </div>

          <span>interviewprep</span>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">YOUR WORKSPACE</div>

          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`sidebar-link ${
                    item.active ? "active" : ""
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* TIP */}
        <div className="sidebar-tip">
          <div className="tip-icon">
            <Lightbulb size={17} />
          </div>

          <div>
            <strong>Small tip</strong>
            <p>
              Take a breath before you answer.
              <br />
              A clear structure beats a fast response.
            </p>
          </div>
        </div>

        {/* USER */}
        <div className="sidebar-bottom">
          <div className="profile-row">
            <div className="profile-avatar">S</div>

            <div className="profile-info">
              <strong>Surya Ravula</strong>
              <span>Signed in</span>
            </div>
          </div>

          <button className="settings-button" type="button">
            <Settings size={17} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <span>Workspace</span>
          <ChevronRight size={14} />
          <strong>Dashboard</strong>
        </div>

        {/* HERO */}
        <section className="dashboard-hero">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              YOUR NEXT INTERVIEW STARTS HERE
            </div>

            <h1>
              Practice out loud.
              <br />
              <span>Show what you know.</span>
            </h1>

            <p>
              A calm space to rehearse real interview questions,
              one answer at a time.
            </p>
          </div>

          <Link
            href="/interview/setup"
            className="primary-button hero-button"
          >
            <Play size={16} />
            Start interview
          </Link>
        </section>

        {/* STATS */}
        <section className="stats-grid">
          <div className="dashboard-card stat-card">
            <div className="stat-top">
              <span>Sessions completed</span>
              <div className="stat-icon purple">
                <CheckCircle2 size={18} />
              </div>
            </div>

            <strong>{results.length}</strong>
            <p>Keep showing up</p>
          </div>

          <div className="dashboard-card stat-card">
            <div className="stat-top">
              <span>Average practice score</span>
              <div className="stat-icon blue">
                <BarChart3 size={18} />
              </div>
            </div>

            <strong>{avg || "—"}</strong>
            <p>Across your sessions</p>
          </div>

          <div className="dashboard-card stat-card">
            <div className="stat-top">
              <span>Answers practiced</span>
              <div className="stat-icon green">
                <Mic2 size={18} />
              </div>
            </div>

            <strong>{answered}</strong>
            <p>One answer at a time</p>
          </div>

          <div className="dashboard-card stat-card">
            <div className="stat-top">
              <span>Practice streak</span>
              <div className="stat-icon orange">
                <Target size={18} />
              </div>
            </div>

            <strong>{results.length ? 1 : 0} days</strong>
            <p>Consistency builds confidence</p>
          </div>
        </section>

        {/* INTERVIEW SETUP */}
        <section>
          <div className="section-heading">
            <div>
              <h2>Set up your interview</h2>
              <p>
                Choose your role, technology and experience level.
              </p>
            </div>

            <span className="question-count">
              20 questions · 10 theory · 10 coding
            </span>
          </div>

          <div className="dashboard-card setup-card">
            <div className="setup-grid">
              {/* ROLE */}
              <div className="setup-column">
                <div className="field-label">JOB TITLE</div>

                <h3>Data Engineer</h3>

                <p className="field-description">
                  Questions use this role as their interview context.
                </p>

                <div className="setup-notice">
                  <div className="notice-dot" />

                  <span>
                    Your interview path is ready. Pick the level
                    that matches your current experience.
                  </span>
                </div>
              </div>

              {/* TECHNOLOGY */}
              <div className="setup-column">
                <div className="field-label">
                  WHAT ARE YOU PREPARING FOR?
                </div>

                <h3 className="technology-title">
                  <Code2 size={18} />
                  Snowflake
                </h3>

                <div className="level-grid">
                  <Link
                    href="/interview/setup"
                    className="level-option"
                  >
                    <strong>Foundation</strong>
                    <span>I'm starting out</span>
                  </Link>

                  <Link
                    href="/interview/setup"
                    className="level-option selected"
                  >
                    <strong>Intermediate</strong>
                    <span>I'm ready to go deeper</span>
                  </Link>

                  <Link
                    href="/interview/setup"
                    className="level-option"
                  >
                    <strong>Advanced</strong>
                    <span>I'm very confident</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="setup-footer">
              <Link
                href="/interview/setup"
                className="primary-button"
              >
                Start interview
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* WEEKLY PRACTICE */}
        <section>
          <div className="section-heading">
            <div>
              <h2>Weekly practice</h2>
              <p>
                Keep a steady rhythm and build interview confidence.
              </p>
            </div>

            <span className="question-count">
              Answers completed over the last seven days.
            </span>
          </div>

          <div className="dashboard-card weekly-card">
            <div className="weekly-header">
              <div>
                <h3>Build your interview rhythm</h3>

                <p>
                  {results.length
                    ? `${answered} answers completed so far.`
                    : "Complete a new session to see your activity here."}
                </p>
              </div>

              <div className="weekly-target">
                <Target size={21} />
              </div>
            </div>

            <div className="weekly-chart">
              {weeklyActivity.map((item) => (
                <div className="day-column" key={item.day}>
                  <div className="bar-wrapper">
                    <div
                      className="activity-bar"
                      style={{
                        height: `${Math.max(
                          item.value * 8,
                          8
                        )}%`,
                      }}
                    />
                  </div>

                  <span>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILL BREAKDOWN */}
        <section>
          <div className="section-heading">
            <div>
              <h2>Skill breakdown</h2>
              <p>
                Track how your interview performance develops.
              </p>
            </div>

            <span className="question-count">
              Based on completed sessions
            </span>
          </div>

          <div className="skill-grid">
            {/* SCORE */}
            <div className="dashboard-card skill-card">
              <div className="skill-card-header">
                <div>
                  <span className="field-label">PRACTICE SCORE</span>
                  <h3>Practice score</h3>
                </div>

                <div className="skill-icon">
                  <TrendingUp size={20} />
                </div>
              </div>

              {results.length ? (
                <div className="score-content">
                  <div className="score-circle">
                    <strong>{avg}</strong>
                    <span>/100</span>
                  </div>

                  <div>
                    <strong>Your average score</strong>
                    <p>
                      Keep practicing to improve your interview
                      performance.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <BarChart3 size={22} />
                  </div>

                  <strong>Build your practice score</strong>

                  <p>
                    Complete an interview to start tracking your
                    performance.
                  </p>

                  <Link href="/interview/setup">
                    Start your first session
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            {/* NEXT FOCUS */}
            <div className="dashboard-card skill-card">
              <div className="skill-card-header">
                <div>
                  <span className="field-label">RECOMMENDED</span>
                  <h3>Next practice focus</h3>
                </div>

                <div className="skill-icon">
                  <Target size={20} />
                </div>
              </div>

              <div className="focus-content">
                <div className="focus-number">01</div>

                <div>
                  <strong>
                    {results.length
                      ? "Review your lowest-scoring answers"
                      : "Complete your first practice session"}
                  </strong>

                  <p>
                    {results.length
                      ? "Retry difficult questions and focus on explaining your reasoning clearly."
                      : "Your first practice session can highlight a topic to focus on."}
                  </p>

                  <Link href="/practice">
                    Go to practice room
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK LINKS */}
        <section className="quick-section">
          <div className="section-heading">
            <div>
              <h2>Keep learning</h2>
              <p>Jump directly into your workspace.</p>
            </div>
          </div>

          <div className="quick-grid">
            <Link href="/practice" className="quick-card">
              <div className="quick-icon purple">
                <Mic2 size={20} />
              </div>

              <div>
                <strong>Practice room</strong>
                <span>Start answering questions</span>
              </div>

              <ArrowRight size={16} />
            </Link>

            <Link href="/topics" className="quick-card">
              <div className="quick-icon blue">
                <BookOpen size={20} />
              </div>

              <div>
                <strong>Topics</strong>
                <span>Explore interview topics</span>
              </div>

              <ArrowRight size={16} />
            </Link>

            <Link href="/progress" className="quick-card">
              <div className="quick-icon green">
                <TrendingUp size={20} />
              </div>

              <div>
                <strong>My progress</strong>
                <span>Review your performance</span>
              </div>

              <ArrowRight size={16} />
            </Link>

            <Link href="/notes" className="quick-card">
              <div className="quick-icon orange">
                <FileText size={20} />
              </div>

              <div>
                <strong>Docs & notes</strong>
                <span>Review your study material</span>
              </div>

              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}