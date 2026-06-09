import React, { useState } from 'react';
import { Profile, ContactMessage } from '../types';
import { Mail, Phone, Github, Linkedin, BookOpen, Send, CheckCircle2, History, Trash2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactSectionProps {
  profile: Profile;
  messages: ContactMessage[];
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'sentAt'>) => void;
  onDeleteMessage: (id: string) => void;
}

export default function ContactSection({ profile, messages, onSendMessage, onDeleteMessage }: ContactSectionProps) {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) {
      return;
    }

    onSendMessage({
      senderName,
      senderEmail,
      subject: subject || '포트폴리오 문의 사항',
      message
    });

    // Reset Form
    setSenderName('');
    setSenderEmail('');
    setSubject('');
    setMessage('');

    // Trigger feedback
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  const contactOptions = [
    {
      icon: <Mail className="w-4 h-4 text-rose-500" />,
      label: '이메일 주소',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: <Phone className="w-4 h-4 text-emerald-500" />,
      label: '휴대폰 번호',
      value: profile.phone,
      href: `tel:${profile.phone}`,
    },
    {
      icon: <Github className="w-4 h-4 text-slate-800" />,
      label: 'GitHub',
      value: 'github.com/limsorin',
      href: profile.github,
    },
    {
      icon: <Linkedin className="w-4 h-4 text-indigo-600" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/limsorin',
      href: profile.linkedin,
    },
    {
      icon: <BookOpen className="w-4 h-4 text-amber-600" />,
      label: '개인 기술 블로그',
      value: 'velog.io/@limsorin',
      href: profile.blog,
    }
  ];

  return (
    <section id="contact" className="py-12 border-t-2 border-editorial-dark">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-editorial-dark" />
          <h2 className="text-2xl font-display font-black text-editorial-dark tracking-tight uppercase">연락 및 피드백 (Contact Me)</h2>
        </div>

        {/* Messaging Logs Trigger */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border border-editorial-dark bg-white hover:bg-editorial-beige text-xs font-bold uppercase tracking-wider text-editorial-dark transition cursor-pointer"
        >
          <History className="w-3.5 h-3.5 text-editorial-dark" />
          {showHistory ? '보관함 접기 (COLLAPSE)' : `메시지 확인 (${messages.length})`}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact info side */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-none p-6 border border-editorial-dark/15">
            <h3 className="text-sm font-bold text-editorial-dark mb-4 uppercase tracking-wider border-b border-editorial-dark/10 pb-2">다이렉트 연락 정보</h3>
            <p className="text-xs text-editorial-dark/70 mb-6 leading-relaxed">
              업무 요청, 캐주얼한 커피챗, 포트폴리오에 대한 따뜻한 피드백 등 무엇이든 환영합니다! 아래 연동 링크를 사용하시거나 우측 문의 폼을 전송해주시면 빠르게 소통하겠습니다.
            </p>

            <div className="space-y-3">
              {contactOptions.map((opt, i) => (
                <a
                  key={i}
                  href={opt.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-none bg-editorial-beige/10 border border-editorial-dark/10 hover:border-editorial-dark transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-none bg-white border border-editorial-dark/5 group-hover:bg-editorial-beige transition-colors">
                      {opt.icon}
                    </div>
                    <div>
                      <h4 className="text-[9px] font-bold text-editorial-dark/40 uppercase tracking-widest leading-none">{opt.label}</h4>
                      <p className="text-xs font-bold text-editorial-dark mt-1 font-mono tracking-tight break-all">
                        {opt.value}
                      </p>
                    </div>
                  </div>
                  <Globe className="w-3.5 h-3.5 text-editorial-dark/30 group-hover:text-editorial-dark transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form side */}
        <div className="lg:col-span-7 bg-white border border-editorial-dark/15 rounded-none p-6 shadow-none relative">
          <h3 className="text-sm font-bold text-editorial-dark mb-4 uppercase tracking-wider border-b border-editorial-dark/10 pb-2">문의 메시지 보내기</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-wider">보내는 이 성함 *</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3.5 py-2.5 outline-hidden focus:border-editorial-dark transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-wider">회신받을 이메일 *</label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="example@domain.com"
                  className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3.5 py-2.5 outline-hidden focus:border-editorial-dark transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-wider">제목 (선택)</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="커피챗 요청 / 채용 포지션 문의 등"
                className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3.5 py-2.5 outline-hidden focus:border-editorial-dark transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-editorial-dark/50 uppercase tracking-wider">상세 문의 사양 *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="포트폴리오 주인의 역량에 대해 나누고 싶은 이야기나 구체적인 프로젝트 문의를 기재해주세요..."
                className="w-full text-xs text-editorial-dark bg-white border border-editorial-dark/15 rounded-none px-3.5 py-2.5 outline-hidden focus:border-editorial-dark transition-all resize-none leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] text-editorial-dark/40 font-mono italic">
                * 필수 항목 기재 시 실시간 접수 리스트로 live-mount 됩니다.
              </span>
              
              <button
                type="submit"
                className="px-5 py-2.5 bg-editorial-dark hover:opacity-90 active:scale-95 text-editorial-beige rounded-none text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-none transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> 메시지 전송
              </button>
            </div>
          </form>

          {/* Toast Notification Container inside Form */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-6 bottom-6 bg-editorial-dark text-editorial-beige p-4 rounded-none shadow-lg border border-editorial-dark flex items-center gap-3 z-10"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs font-bold font-sans">성공적으로 임시 보관함에 기록되었습니다!</p>
                  <p className="text-[10px] text-editorial-beige/75 mt-0.5">상단의 '메시지 확인' 버튼을 누르면 실시간 접수를 확인하실 수 있습니다.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Messages Outbox Drawer list */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 overflow-hidden"
          >
            <div className="bg-editorial-beige/40 rounded-none p-6 border border-editorial-dark/10 shadow-none">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-editorial-dark/10">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-editorial-dark" />
                  <h3 className="text-xs font-bold text-editorial-dark uppercase tracking-wider">실시간 수신 메시지 보관함 (Sent Messages Log)</h3>
                </div>
                <span className="text-[10px] bg-white text-editorial-dark font-bold px-2.5 py-0.5 rounded-none border border-editorial-dark/15">
                  총 {messages.length}개 보관됨
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="py-10 text-center text-editorial-dark/40 text-xs font-mono italic">
                  아직 전송된 메시지가 없습니다. 위의 문의 폼을 사용해 첫 메시지를 보내보세요!
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-white rounded-none p-4 border border-editorial-dark/15 hover:border-editorial-dark transition flex flex-col justify-between gap-3 relative group">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5 pb-2 border-b border-editorial-dark/5">
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-editorial-dark/50">
                            <span className="font-bold text-editorial-dark">{msg.senderName}</span>
                            <span className="text-[10px] text-editorial-dark/40 font-mono">({msg.senderEmail})</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-editorial-dark/40 font-mono">
                              {new Date(msg.sentAt).toLocaleString('ko-KR')}
                            </span>
                            <button
                              onClick={() => onDeleteMessage(msg.id)}
                              className="p-1 rounded-none text-editorial-dark/30 hover:text-rose-600 hover:bg-rose-50 transition opacity-0 group-hover:opacity-100 absolute -top-1.5 -right-1.5 bg-white border border-editorial-dark/15 rounded-none"
                              title="Delete Message Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <h4 className="text-xs font-bold text-editorial-dark mb-1">
                          제목: {msg.subject}
                        </h4>
                        
                        <p className="text-xs text-editorial-dark/80 leading-relaxed font-sans whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
