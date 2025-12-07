"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CropsManagement } from "@/components/admin/crops-management"
import { DiseasesManagement } from "@/components/admin/diseases-management"
import { UsersManagement } from "@/components/admin/users-management"
import { Leaf, Bug, Users } from "lucide-react"

export function AdminTabs() {
  return (
    <Tabs defaultValue="crops" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="crops" className="flex items-center gap-2">
          <Leaf size={16} /> Crops
        </TabsTrigger>
        <TabsTrigger value="diseases" className="flex items-center gap-2">
          <Bug size={16} /> Diseases
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users size={16} /> Users
        </TabsTrigger>
      </TabsList>

      <TabsContent value="crops">
        <CropsManagement />
      </TabsContent>

      <TabsContent value="diseases">
        <DiseasesManagement />
      </TabsContent>

      <TabsContent value="users">
        <UsersManagement />
      </TabsContent>
    </Tabs>
  )
}
