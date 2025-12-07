"use client"

import { useState } from "react"
import { Trash2, Shield, ShieldOff } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  analysisCount: number
}

export function UsersManagement() {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Doe", email: "john@example.com", role: "user", analysisCount: 15 },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", analysisCount: 28 },
    { id: "3", name: "Admin User", email: "admin@agrovision.com", role: "admin", analysisCount: 0 },
  ])

  const handleToggleRole = (id: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role: user.role === "admin" ? "user" : "admin" } : user)),
    )
  }

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-color-card border border-color-border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-color-primary">{users.length}</p>
          <p className="text-sm text-color-muted">Total Users</p>
        </div>
        <div className="bg-color-card border border-color-border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-color-accent">{users.filter((u) => u.role === "admin").length}</p>
          <p className="text-sm text-color-muted">Admins</p>
        </div>
        <div className="bg-color-card border border-color-border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-color-secondary">
            {users.reduce((sum, u) => sum + u.analysisCount, 0)}
          </p>
          <p className="text-sm text-color-muted">Total Analyses</p>
        </div>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-color-card border border-color-border rounded-xl p-6 flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <p className="font-bold">{user.name}</p>
                {user.role === "admin" && (
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-color-secondary/20 text-color-secondary">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-sm text-color-muted">{user.email}</p>
              <p className="text-xs text-color-muted mt-2">Analyses: {user.analysisCount}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleToggleRole(user.id)}
                className="p-2 hover:bg-color-background rounded-lg transition"
                title={user.role === "admin" ? "Remove admin" : "Make admin"}
              >
                {user.role === "admin" ? (
                  <ShieldOff size={18} className="text-color-warning" />
                ) : (
                  <Shield size={18} className="text-color-secondary" />
                )}
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="p-2 hover:bg-color-background rounded-lg transition text-color-error"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
