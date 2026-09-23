'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useOutsideClick } from '@/hooks/use-outside-click'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Ultra-fast smooth spring transition config for 60fps expansion
const transitionConfig = {
    type: "spring",
    stiffness: 400,
    damping: 32,
    mass: 0.6
}

/**
 * @typedef {Object} BentoItem
 * @property {string|number} [id]
 * @property {string} title
 * @property {string} [subtitle]
 * @property {string} [description]
 * @property {React.ReactNode} content
 * @property {React.ReactNode} [icon]
 * @property {string} [className]
 */

/**
 * @param {Object} props
 * @param {BentoItem[]} props.items
 * @param {string} [props.className]
 */
export function ExpandableBentoGrid({ items = [], className = '' }) {
    const [active, setActive] = useState(null)
    const ref = useRef(null)
    const id = useId()

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === 'Escape') {
                setActive(null)
            }
        }

        if (active && typeof active === 'object') {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [active])

    useOutsideClick(ref, () => setActive(null))

    return (
        <>
            <AnimatePresence mode="wait">
                {active && typeof active === 'object' && (
                    <div className="fixed inset-0 grid place-items-center z-[10001] p-4 sm:p-6 md:p-10 pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-0"
                            onClick={() => setActive(null)}
                        />
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.1 } }}
                            className="flex absolute top-4 right-4 md:top-6 md:right-6 items-center justify-center bg-purple-950/80 border border-purple-500/30 text-white rounded-full h-9 w-9 z-20 hover:scale-105 active:scale-95 transition-transform"
                            onClick={() => setActive(null)}
                        >
                            <X className="h-4 w-4 text-slate-200" />
                        </motion.button>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 15 }}
                            transition={{ type: "spring", stiffness: 380, damping: 28 }}
                            ref={ref}
                            className="w-full max-w-2xl sm:max-w-3xl max-h-[85vh] flex flex-col bg-[#0d071a] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(168,85,247,0.35)] border border-purple-500/30 relative text-slate-100 z-10 will-change-transform"
                        >
                            <div className="w-full h-36 sm:h-44 bg-purple-950/50 border-b border-purple-500/20 flex items-center justify-center relative overflow-hidden shrink-0">
                                {active.icon ? (
                                    <div className="scale-[2.2] text-purple-400">{active.icon}</div>
                                ) : (
                                    <div className="w-full h-full bg-purple-900/20" />
                                )}
                            </div>

                            <div className="flex flex-col flex-1 overflow-y-auto px-8 sm:px-12 py-8 sm:py-10 gap-6 [scrollbar-width:thin] w-full box-border">
                                <div className="flex flex-col gap-3 text-left">
                                    {active.subtitle && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="text-xs font-semibold tracking-wider uppercase text-purple-300 bg-purple-500/15 border border-purple-500/30 px-3.5 py-1.5 rounded-full w-fit mb-1"
                                        >
                                            {active.subtitle}
                                        </motion.span>
                                    )}
                                    <motion.h3
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.15 }}
                                        className="font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight"
                                    >
                                        {active.title}
                                    </motion.h3>
                                    {active.description && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.15 }}
                                            className="text-slate-400 text-base sm:text-lg leading-relaxed mt-1"
                                        >
                                            {active.description}
                                        </motion.p>
                                    )}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    transition={{ duration: 0.15, delay: 0.05 }}
                                    className="text-slate-300 text-base leading-relaxed flex flex-col items-start gap-4 pt-6 border-t border-purple-500/15 w-full box-border"
                                >
                                    {active.content}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <ul className={cn("max-w-4xl mx-auto w-full gap-3 lg:gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start", className)}>
                {items.map((item) => (
                    <motion.li
                        key={item.id}
                        onClick={() => setActive(item)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="p-4 flex flex-col md:flex-row justify-between items-center rounded-xl cursor-pointer bg-[#0d071a]/70 hover:bg-[#150b2b] border border-purple-500/20 hover:border-purple-500/40 shadow-md hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] will-change-transform list-none"
                    >
                        <div className="flex gap-3 flex-row items-center justify-center mx-auto w-full">
                            <div className="h-14 w-14 rounded-lg bg-purple-950/60 border border-purple-500/20 flex items-center justify-center text-purple-400 p-1 shrink-0">
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-white text-left">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-left text-xs md:text-[14px]">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </>
    )
}

export default ExpandableBentoGrid
