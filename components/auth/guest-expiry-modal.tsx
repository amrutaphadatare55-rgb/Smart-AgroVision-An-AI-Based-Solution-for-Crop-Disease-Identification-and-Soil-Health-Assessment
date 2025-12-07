"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getGuestRemainingMs, isGuestActive, clearGuestSession } from "@/hooks/use-guest"

export default function GuestExpiryModal() {
  const [open, setOpen] = useState(false)
  const [remaining, setRemaining] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const check = () => {
      const active = isGuestActive()
      if (!active && localStorage.getItem("guest_start")) {
        // Guest expired: show modal and clear guest session
        setOpen(true)
        clearGuestSession()
      } else {
        setOpen(false)
      }
      setRemaining(getGuestRemainingMs())
    }

    check()
    const id = setInterval(check, 1000)
    return () => clearInterval(id)
  }, [])

  const handleContinueGuest = () => {
    // No longer allowed to extend as guest in enforced mode.
    // Redirect user to prelogin where they can sign in or register.
    setOpen(false)
    router.push("/prelogin")
  }

  const handleClear = () => {
    clearGuestSession()
    setOpen(false)
    router.push("/prelogin")
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Guest Session Expired</DialogTitle>
        <DialogDescription>
          Your temporary guest access has expired. To continue using features please sign in or create an account.
        </DialogDescription>

        <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          <p>Remaining: {Math.ceil(remaining / 1000)}s</p>
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <Link href="/login" className="px-4 py-2 rounded-lg bg-green-600 text-white">Sign In</Link>
            <Link href="/register" className="px-4 py-2 rounded-lg border">Create Account</Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
