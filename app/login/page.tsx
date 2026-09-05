"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckBadgeIcon,
  CheckIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  SparklesIcon,
  BuildingStorefrontIcon,
  PhoneIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import OtpInput from "@/components/auth/otp-input";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

type AuthTab = "login" | "register" | "forgot";
type LoginMethod = "otp" | "password";

export default function LoginPage() {
  const router = useRouter();

  // Tab & Method state
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("otp");

  // Common Form Fields
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [craft, setCraft] = useState("Menuiserie / Ébénisterie");

  // OTP state
  const [otpStep, setOtpStep] = useState<"email" | "code">("email");
  const [otpCode, setOtpCode] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [hasOtpError, setHasOtpError] = useState(false);

  // Status & UI state
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Email format validation
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const isEmailValid = validateEmail(email);

  // Resend countdown for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTab === "login" && loginMethod === "otp" && otpStep === "code" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTab, loginMethod, otpStep, resendTimer]);

  // Handle Tab Switch
  const switchTab = (tab: AuthTab) => {
    setActiveTab(tab);
    setGeneralError("");
    setSuccessMessage("");
    setOtpStep("email");
    setOtpCode("");
  };

  // 1. Submit OTP Request
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isEmailValid || isLoading) return;

    setIsLoading(true);
    setGeneralError("");

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: { shouldCreateUser: true },
        });
        if (error) throw error;
      } else {
        await new Promise((res) => setTimeout(res, 600));
      }
      setOtpStep("code");
      setResendTimer(30);
      setCanResend(false);
    } catch (err: any) {
      setGeneralError(err.message || "Erreur lors de l'envoi du code. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Verify OTP Code
  const handleVerifyOtp = async (codeToVerify?: string) => {
    const code = codeToVerify || otpCode;
    if (code.length < 6 || isLoading) return;

    setIsLoading(true);
    setGeneralError("");
    setHasOtpError(false);

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.verifyOtp({
          email: email.trim(),
          token: code,
          type: "email",
        });
        if (error) throw error;
      } else {
        await new Promise((res) => setTimeout(res, 600));
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } catch (err: any) {
      setHasOtpError(true);
      setGeneralError(err.message || "Code OTP incorrect ou expiré.");
      setOtpCode("");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Login with Password
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid || !password || isLoading) return;

    setIsLoading(true);
    setGeneralError("");

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
      } else {
        await new Promise((res) => setTimeout(res, 600));
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } catch (err: any) {
      setGeneralError(err.message || "Email ou mot de passe incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Register Submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid || !fullName || isLoading) return;

    setIsLoading(true);
    setGeneralError("");

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password || "ZapPass2025!",
          options: {
            data: {
              full_name: fullName,
              business_name: businessName,
              phone,
              craft,
            },
          },
        });
        if (error) throw error;
      } else {
        await new Promise((res) => setTimeout(res, 700));
      }

      setSuccessMessage("Compte créé avec succès ! Redirection vers votre cockpit...");
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 900);
    } catch (err: any) {
      setGeneralError(err.message || "Impossible de créer le compte. Vérifiez vos informations.");
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Forgot Password Submission
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid || isLoading) return;

    setIsLoading(true);
    setGeneralError("");

    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/dashboard`,
        });
        if (error) throw error;
      } else {
        await new Promise((res) => setTimeout(res, 600));
      }
      setSuccessMessage("Un lien de réinitialisation sécurisé vous a été envoyé par email.");
    } catch (err: any) {
      setGeneralError(err.message || "Erreur lors de la demande de réinitialisation.");
    } finally {
      setIsLoading(false);
    }
  };

  // 6. Google Login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setGeneralError("");
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
      } else {
        await new Promise((res) => setTimeout(res, 600));
        router.push("/dashboard");
      }
    } catch (err: any) {
      setGeneralError(err.message || "Erreur avec Google.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0C0C0C] text-[#F4F4F5]">
      {/* ──────────────────────────────────────────────────────────────────────────
          COLONNE GAUCHE : Formulaire & Contrôles (Style Plat, Précis, Sans Shadow)
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col justify-between min-h-screen px-6 py-8 sm:px-12 md:px-16 lg:px-14 xl:px-20">
        {/* Top Header */}
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="inline-flex items-center gap-3 no-underline group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#262626] bg-[#171717]">
              <Image
                src="/logo.png"
                alt="ZAP Logo"
                width={32}
                height={32}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "20px",
                letterSpacing: "0.08em",
                color: "#F4F4F5",
              }}
            >
              ZAP
            </span>
          </Link>

          <span className="text-xs text-neutral-500 font-mono tracking-wide hidden sm:inline-block">
            UEMOA · OHADA
          </span>
        </div>

        {/* Center Container */}
        <div className="w-full max-w-[430px] mx-auto my-auto py-8">
          {/* Onglets de navigation : Connexion | Inscription | Récupération */}
          <div className="flex items-center p-1 bg-[#171717] border border-[#262626] rounded-xl mb-8">
            <button
              type="button"
              onClick={() => switchTab("login")}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === "login"
                  ? "bg-[#262626] text-[#D4AF37]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => switchTab("register")}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === "register"
                  ? "bg-[#262626] text-[#D4AF37]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Inscription
            </button>
            <button
              type="button"
              onClick={() => switchTab("forgot")}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === "forgot"
                  ? "bg-[#262626] text-[#D4AF37]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Aide
            </button>
          </div>

          {/* Feedback messages */}
          {generalError && (
            <div className="mb-5 p-3 rounded-lg bg-red-950/40 border border-red-900/50 text-red-300 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              <span>{generalError}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/50 text-emerald-300 text-xs flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: CONNEXION */}
          {activeTab === "login" && (
            <div>
              <div className="mb-6">
                <h1
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "28px",
                    lineHeight: "1.2",
                    color: "#F4F4F5",
                    marginBottom: "8px",
                  }}
                >
                  Accédez à votre cockpit
                </h1>
                <p className="text-sm text-neutral-400">
                  Générez et retrouvez vos devis, factures et reçus sécurisés.
                </p>
              </div>

              {/* Bouton Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-[#171717] border border-[#262626] text-sm font-medium text-neutral-200 hover:bg-[#202020] hover:border-neutral-700 transition-colors disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continuer avec Google</span>
              </button>

              {/* Separator */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#262626]" />
                </div>
                <span className="relative px-3 bg-[#0C0C0C] text-xs text-neutral-500 uppercase tracking-wider">
                  ou avec votre email
                </span>
              </div>

              {/* Sous-mode: OTP vs Mot de passe */}
              <div className="flex items-center gap-4 mb-5 text-xs text-neutral-400">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod("otp");
                    setOtpStep("email");
                  }}
                  className={`pb-1 border-b transition-colors ${
                    loginMethod === "otp"
                      ? "border-[#D4AF37] text-[#D4AF37] font-medium"
                      : "border-transparent hover:text-white"
                  }`}
                >
                  Code de connexion (sans mot de passe)
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod("password")}
                  className={`pb-1 border-b transition-colors ${
                    loginMethod === "password"
                      ? "border-[#D4AF37] text-[#D4AF37] font-medium"
                      : "border-transparent hover:text-white"
                  }`}
                >
                  Mot de passe
                </button>
              </div>

              {/* Method A: OTP FLOW */}
              {loginMethod === "otp" && (
                <div>
                  {otpStep === "email" ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                          Adresse email professionnelle
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="artisan@atelier.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setEmailTouched(true);
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#171717] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!isEmailValid || isLoading}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] text-[#0C0C0C] text-sm font-semibold hover:bg-[#e2b170] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isLoading ? "Envoi en cours..." : "Recevoir mon code par email"}
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-5">
                      <div className="text-center">
                        <p className="text-xs text-neutral-400 mb-1">
                          Code à 6 chiffres envoyé à :
                        </p>
                        <p className="text-sm font-medium text-[#D4AF37] flex items-center justify-center gap-2">
                          {email}
                          <button
                            type="button"
                            onClick={() => setOtpStep("email")}
                            className="text-xs text-neutral-400 hover:text-white underline ml-1"
                          >
                            Modifier
                          </button>
                        </p>
                      </div>

                      {/* Composant OTP */}
                      <OtpInput
                        length={6}
                        value={otpCode}
                        onChange={(val) => setOtpCode(val)}
                        onComplete={handleVerifyOtp}
                        hasError={hasOtpError}
                        isSuccess={isSuccess}
                        isDisabled={isLoading}
                      />

                      {/* Resend timer */}
                      <div className="text-center pt-2">
                        {resendTimer > 0 ? (
                          <span className="text-xs text-neutral-500 font-mono">
                            Renvoyer un code dans 00:{resendTimer < 10 ? `0${resendTimer}` : resendTimer}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSendOtp()}
                            disabled={isLoading}
                            className="text-xs text-[#D4AF37] hover:underline"
                          >
                            Renvoyer un nouveau code
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Method B: PASSWORD FLOW */}
              {loginMethod === "password" && (
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nom@entreprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#171717] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-medium text-neutral-300">
                        Mot de passe
                      </label>
                      <button
                        type="button"
                        onClick={() => switchTab("forgot")}
                        className="text-xs text-[#D4AF37] hover:underline"
                      >
                        Mot de passe oublié ?
                      </button>
                    </div>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#171717] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isEmailValid || !password || isLoading}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] text-[#0C0C0C] text-sm font-semibold hover:bg-[#e2b170] transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? "Connexion..." : "Se connecter"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: INSCRIPTION */}
          {activeTab === "register" && (
            <div>
              <div className="mb-6">
                <h1
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "28px",
                    lineHeight: "1.2",
                    color: "#F4F4F5",
                    marginBottom: "8px",
                  }}
                >
                  Créez votre atelier ZAP
                </h1>
                <p className="text-sm text-neutral-400">
                  8 documents offerts dès l'ouverture. Aucune carte bancaire requise.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Votre nom complet
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Koffi Mensah"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Nom de l'activité / Atelier
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Atelier Teck & Or"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Métier principal
                    </label>
                    <select
                      value={craft}
                      onChange={(e) => setCraft(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                    >
                      <option value="Menuiserie / Ébénisterie">Menuiserie / Bois</option>
                      <option value="Couture & Mode">Couture & Mode</option>
                      <option value="Mécanique & Garage">Mécanique & Auto</option>
                      <option value="BTP & Électricité">BTP & Chantiers</option>
                      <option value="Commerce & Vente">Commerce / Boutique</option>
                      <option value="Autre prestation">Autre service</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Numéro WhatsApp (pour vos clients)
                  </label>
                  <input
                    type="tel"
                    placeholder="+229 97 00 00 00 / +225 07 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@atelier.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Au moins 6 caractères"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#171717] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isEmailValid || !fullName || isLoading}
                  className="w-full py-2.5 px-4 mt-2 rounded-xl bg-[#D4AF37] text-[#0C0C0C] text-sm font-semibold hover:bg-[#e2b170] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? "Création en cours..." : "Créer mon compte ZAP"}
                </button>
              </form>

              <div className="mt-4 text-center">
                <span className="text-xs text-neutral-400">Déjà inscrit ? </span>
                <button
                  type="button"
                  onClick={() => switchTab("login")}
                  className="text-xs text-[#D4AF37] hover:underline"
                >
                  Connectez-vous ici
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: RÉCUPÉRATION (MOT DE PASSE OUBLIÉ) */}
          {activeTab === "forgot" && (
            <div>
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => switchTab("login")}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-4"
                >
                  <ArrowLeftIcon className="w-3.5 h-3.5" />
                  Retour à la connexion
                </button>
                <h1
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "26px",
                    lineHeight: "1.2",
                    color: "#F4F4F5",
                    marginBottom: "8px",
                  }}
                >
                  Récupération de compte
                </h1>
                <p className="text-sm text-neutral-400">
                  Entrez l'email associé à votre compte. Vous recevrez un lien pour réinitialiser vos accès.
                </p>
              </div>

              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nom@entreprise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171717] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isEmailValid || isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] text-[#0C0C0C] text-sm font-semibold hover:bg-[#e2b170] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? "Envoi..." : "Envoyer le lien de récupération"}
                </button>
              </form>

              <div className="mt-8 p-4 rounded-xl bg-[#171717] border border-[#262626] text-xs text-neutral-400 space-y-1.5">
                <p className="font-medium text-neutral-200">Besoin d'aide immédiate ?</p>
                <p>
                  Contactez le support technique ZAP sur WhatsApp au{" "}
                  <span className="text-[#D4AF37] font-mono">+229 97 00 00 00</span>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Footer (Colonne gauche) */}
        <div className="pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <div className="flex items-center gap-4">
            <Link href="/#faq" className="hover:text-neutral-300 transition-colors">
              FAQ
            </Link>
            <Link href="/#pricing" className="hover:text-neutral-300 transition-colors">
              Tarifs
            </Link>
            <a
              href="https://wa.me/22997000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              Support WhatsApp
            </a>
          </div>
          <span>© 2025 ZAP · Facturation officielle</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          COLONNE DROITE : Showcase Visuel Immersion ZAP (Caché sur Mobile)
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between relative bg-[#121212] border-l border-[#262626] p-12 xl:p-16 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top Tag */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono font-medium">
            Standard Officiel Afrique de l'Ouest
          </span>
        </div>

        {/* Middle Document Showcase Card (Flat precision, no blur heavy shadows) */}
        <div className="relative z-10 my-auto py-6 max-w-[460px] mx-auto w-full">
          <div className="bg-[#171717] border border-[#262626] rounded-2xl p-6 relative">
            {/* Header Document */}
            <div className="flex items-start justify-between border-b border-[#262626] pb-4 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] block">
                  FACTURE CERTIFIÉE
                </span>
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "18px",
                    color: "#F4F4F5",
                  }}
                >
                  FAC-2025-0104
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                PAYÉE VIA WAVE
              </span>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-5">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block mb-0.5">Émetteur</span>
                <p className="font-medium text-neutral-200">Atelier Teck & Or</p>
                <p className="text-[11px] text-neutral-400">Cotonou, Bénin</p>
                <p className="text-[10px] text-neutral-500 font-mono">IFU: 3201948572102</p>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block mb-0.5">Client</span>
                <p className="font-medium text-neutral-200">Cabinet Horizon SARL</p>
                <p className="text-[11px] text-neutral-400">Abidjan, Cocody</p>
              </div>
            </div>

            {/* Line items mini table */}
            <div className="bg-[#0C0C0C] rounded-lg p-3 border border-[#262626] mb-5 text-xs">
              <div className="flex justify-between text-[11px] text-neutral-400 border-b border-[#1f1f1f] pb-1.5 mb-2">
                <span>Désignation prestation</span>
                <span>Montant FCFA</span>
              </div>
              <div className="flex justify-between text-neutral-200 py-1">
                <span>Table de réunion teck massif (12 places)</span>
                <span className="font-mono text-neutral-100">350 000</span>
              </div>
              <div className="flex justify-between text-neutral-200 py-1">
                <span>Livraison & installation sur site</span>
                <span className="font-mono text-neutral-100">35 000</span>
              </div>
              <div className="flex justify-between text-[#D4AF37] font-medium border-t border-[#1f1f1f] pt-2 mt-1">
                <span>Total net réglé</span>
                <span className="font-mono font-semibold">385 000 FCFA</span>
              </div>
            </div>

            {/* Cachet & Signature authentifiés */}
            <div className="flex items-center justify-between pt-2 border-t border-[#262626]">
              {/* Tampon */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-dashed border-[#D4AF37]/60 flex flex-col items-center justify-center text-[7px] text-[#D4AF37] font-mono leading-none rotate-[-6deg]">
                  <span>ATELIER</span>
                  <span className="font-bold">ZAP</span>
                  <span>CERTIFIÉ</span>
                </div>
                <div className="text-[10px] text-neutral-400">
                  <p className="text-neutral-200 font-medium">Cachet officiel</p>
                  <p className="text-neutral-500">Apposé à l'émission</p>
                </div>
              </div>

              {/* Signature */}
              <div className="text-right">
                <span
                  style={{
                    fontFamily: "cursive",
                    fontSize: "15px",
                    color: "#D4AF37",
                  }}
                >
                  K. Mensah
                </span>
                <p className="text-[9px] text-neutral-500 font-mono">Signé numériquement</p>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="mt-6 p-4 rounded-xl bg-[#171717]/80 border border-[#262626] text-xs text-neutral-300">
            <p className="italic mb-2 leading-relaxed">
              « Mes clients ne négocient plus mes prix depuis que je leur envoie des devis ZAP au format officiel avec mon cachet. C'est le jour et la nuit avec les vieux carnets reçus. »
            </p>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-neutral-200 font-medium">Koffi Mensah — Maître Menuisier</span>
              <span className="text-[#D4AF37] font-mono">Cotonou, Bénin</span>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="relative z-10 grid grid-cols-3 gap-4 pt-6 border-t border-[#262626] text-center text-xs">
          <div>
            <span className="font-mono text-sm font-semibold text-[#D4AF37] block">{"<"} 60s</span>
            <span className="text-[11px] text-neutral-400">Création express</span>
          </div>
          <div>
            <span className="font-mono text-sm font-semibold text-[#D4AF37] block">WhatsApp</span>
            <span className="text-[11px] text-neutral-400">Partage direct PDF</span>
          </div>
          <div>
            <span className="font-mono text-sm font-semibold text-[#D4AF37] block">OHADA</span>
            <span className="text-[11px] text-neutral-400">Mentions légales</span>
          </div>
        </div>
      </div>
    </div>
  );
}
