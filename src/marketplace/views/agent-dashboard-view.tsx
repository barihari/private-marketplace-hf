import { Copy01, Check, RefreshCcw01 } from "@untitledui/icons"
import { Button } from "@/components/base/buttons/button"
import { Badge } from "@/components/base/badges/badges"
import { Table, TableCard } from "@/components/application/table/table"
import { usePrototypeStore, type Lead } from "../store/use-prototype-store"
import { CreateLinkModal } from "../modals/create-link-modal"
import { RegenerateModal } from "../modals/regenerate-modal"
import { LeadDetailModal } from "../modals/lead-detail-modal"

const formatTimeAgo = (date: Date) => {
  const diffMs = Date.now() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return diffMins <= 1 ? 'sent just now' : `sent ${diffMins} minutes ago`
  if (diffHours < 24) return `sent ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
  return `sent ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
}

export const AgentDashboardView = () => {
  const leads = usePrototypeStore((s) => s.agentDashboard.leads)
  const copiedLeadId = usePrototypeStore((s) => s.agentDashboard.copiedLeadId)
  const openCreateLinkModal = usePrototypeStore((s) => s.openCreateLinkModal)
  const copyLeadLink = usePrototypeStore((s) => s.copyLeadLink)
  const openRegenerateModal = usePrototypeStore((s) => s.openRegenerateModal)
  const openLeadDetail = usePrototypeStore((s) => s.openLeadDetail)

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <TableCard.Root>
        <TableCard.Header
          title="Agent Dashboard"
          description="Manage buyer links and track lead status."
          contentTrailing={
            <Button
              color="secondary"
              size="sm"
              iconLeading={undefined}
              onPress={openCreateLinkModal}
            >
              + Create Link
            </Button>
          }
        />

        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <p className="text-sm text-tertiary text-center">
              No leads yet. Click "+ Create Link" to generate a personalized buyer link.
            </p>
          </div>
        ) : (
          <Table selectionMode="none" aria-label="Leads table">
            <Table.Header>
              <Table.Head id="name" label="Buyer Name" isRowHeader />
              <Table.Head id="email" label="Buyer Email" />
              <Table.Head id="status" label="Status" />
              <Table.Head id="sent" label="Sent" />
              <Table.Head id="actions" label="" />
            </Table.Header>
            <Table.Body>
              {leads.map((lead: Lead) => (
                <Table.Row
                  key={lead.id}
                  id={lead.id}
                  className="cursor-pointer"
                  onAction={() => openLeadDetail(lead.id)}
                >
                  <Table.Cell className="font-medium text-primary">
                    {lead.firstName && lead.lastName
                      ? `${lead.firstName} ${lead.lastName}`
                      : '—'}
                  </Table.Cell>
                  <Table.Cell>{lead.email}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      type="pill-color"
                      size="sm"
                      color={lead.status === 'Pending' ? 'warning' : 'success'}
                    >
                      {lead.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{formatTimeAgo(lead.sentAt)}</Table.Cell>
                  <Table.Cell>
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        color="tertiary"
                        size="sm"
                        iconLeading={copiedLeadId === lead.id ? Check : Copy01}
                        onPress={() => copyLeadLink(lead.id)}
                        aria-label="Copy link"
                      />
                      <Button
                        color="tertiary"
                        size="sm"
                        iconLeading={RefreshCcw01}
                        onPress={() => openRegenerateModal(lead.id)}
                        aria-label="Regenerate link"
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </TableCard.Root>

      <CreateLinkModal />
      <RegenerateModal />
      <LeadDetailModal />
    </div>
  )
}
