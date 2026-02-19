import { create } from 'zustand'

export type TabType = 'agency-admin' | 'agent-signup' | 'agent-dashboard' | 'private-marketplace'
export type LeadStatus = 'Pending' | 'Completed'

export interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  status: LeadStatus
  sentAt: Date
  linkUrl: string
  formSnapshot: {
    firstName?: string
    lastName?: string
    email: string
    zipCode?: string
    propertyValue?: string
    loanAmount?: string
    downPayment?: string
    creditScore?: string
    loanTerm?: string
    militaryStatus?: string
    dtiRatio?: string
    mortgagePoints?: string
    propertyType?: string
    propertyUse?: string
    includeFHA?: boolean
  }
}

export interface Offer {
  id: string
  lenderName: string
  nmls: string
  rate: string
  apr: string
  monthlyPayment: string
  loanType: string
  closingCosts: string
}

interface AgencyAdminForm {
  agencyName: string
  adminName: string
  adminEmail: string
  password: string
  logoFilename: string
  isSubmitted: boolean
}

interface AgentSignupForm {
  firstName: string
  lastName: string
  email: string
  password: string
  isSubmitted: boolean
}

interface CreateLinkModalState {
  isOpen: boolean
  isLoading: boolean
  isSuccess: boolean
  copied: boolean
  generatedLink: string
  formFields: {
    firstName: string
    lastName: string
    email: string
    zipCode: string
    propertyValue: string
    loanAmount: string
    downPayment: string
    creditScore: string
    loanTerm: string
    militaryStatus: string
    dtiRatio: string
    mortgagePoints: string
    propertyType: string
    propertyUse: string
    includeFHA: boolean
  }
}

interface RegenerateModalState {
  isOpen: boolean
  selectedLeadId: string | null
  isLoading: boolean
  newLink: string
  copied: boolean
}

interface LeadDetailModalState {
  isOpen: boolean
  selectedLeadId: string | null
}

interface AgentDashboardState {
  leads: Lead[]
  createLinkModal: CreateLinkModalState
  regenerateModal: RegenerateModalState
  leadDetailModal: LeadDetailModalState
  copiedLeadId: string | null
}

interface EntryModalState {
  isOpen: boolean
  creditScore: string
}

interface GetQuoteModalState {
  isOpen: boolean
  step: 1 | 2 | 3
  selectedLenders: string[]
  email: string
  phone: string
  disclosureAccepted: boolean
  isSubmitting: boolean
}

interface PrivateMarketplaceState {
  buyerIdentity: {
    firstName: string
    lastName: string
    email: string
  }
  entryModal: EntryModalState
  filters: {
    creditScore: string
    zipCode: string
    propertyValue: string
    loanAmount: string
    downPayment: string
    loanTerm: string
    militaryStatus: string
    dtiRatio: string
    mortgagePoints: string
    propertyType: string
    propertyUse: string
    includeFHA: boolean
  }
  filtersLocked: boolean
  isEditingFilters: boolean
  isFindingOffers: boolean
  isUpdatingOffers: boolean
  offers: Offer[]
  additionalOffers: Offer[]
  showMoreOffers: boolean
  getQuoteModal: GetQuoteModalState
  hasEnteredMarketplace: boolean
}

interface PrototypeStore {
  currentTab: TabType
  agencyAdminForm: AgencyAdminForm
  agentSignupForm: AgentSignupForm
  agentDashboard: AgentDashboardState
  privateMarketplace: PrivateMarketplaceState

  setCurrentTab: (tab: TabType) => void
  prefillCurrentTab: () => void
  resetCurrentTab: () => void
  allReset: () => void

  updateAgencyAdminForm: (field: string, value: string) => void
  submitAgencyForm: () => void
  copyAgencyLink: () => void

  updateAgentSignupForm: (field: string, value: string) => void
  submitAgentSignup: () => void
  navigateToAgentDashboard: () => void

  openCreateLinkModal: () => void
  closeCreateLinkModal: () => void
  updateCreateLinkField: (field: string, value: string | boolean) => void
  prefillCreateLink: () => void
  generateLink: () => void
  copyCreateLink: () => void
  copyLeadLink: (leadId: string) => void
  openRegenerateModal: (leadId: string) => void
  closeRegenerateModal: () => void
  regenerateLink: () => void
  copyRegeneratedLink: () => void
  openLeadDetail: (leadId: string) => void
  closeLeadDetail: () => void
  updateLeadStatus: (email: string, status: LeadStatus) => void

  openEntryModal: () => void
  closeEntryModal: () => void
  updateEntryCreditScore: (score: string) => void
  findOffers: () => void
  editFilters: () => void
  updateFilter: (field: string, value: string | boolean) => void
  updateOffers: () => void
  lockFilters: () => void
  toggleShowMoreOffers: () => void
  openGetQuoteModal: (lenderId: string) => void
  closeGetQuoteModal: () => void
  setQuoteStep: (step: 1 | 2 | 3) => void
  toggleLenderSelection: (lenderId: string) => void
  updateQuoteField: (field: string, value: string | boolean) => void
  submitQuoteRequest: () => void
}

const initialAgencyAdminForm: AgencyAdminForm = {
  agencyName: '',
  adminName: '',
  adminEmail: '',
  password: '',
  logoFilename: '',
  isSubmitted: false,
}

const initialAgentSignupForm: AgentSignupForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isSubmitted: false,
}

const initialCreateLinkModal: CreateLinkModalState = {
  isOpen: false,
  isLoading: false,
  isSuccess: false,
  copied: false,
  generatedLink: '',
  formFields: {
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    propertyValue: '',
    loanAmount: '',
    downPayment: '',
    creditScore: '',
    loanTerm: '',
    militaryStatus: '',
    dtiRatio: '',
    mortgagePoints: '',
    propertyType: '',
    propertyUse: '',
    includeFHA: false,
  },
}

const initialAgentDashboard: AgentDashboardState = {
  leads: [],
  createLinkModal: initialCreateLinkModal,
  regenerateModal: {
    isOpen: false,
    selectedLeadId: null,
    isLoading: false,
    newLink: '',
    copied: false,
  },
  leadDetailModal: {
    isOpen: false,
    selectedLeadId: null,
  },
  copiedLeadId: null,
}

const initialPrivateMarketplace: PrivateMarketplaceState = {
  buyerIdentity: { firstName: '', lastName: '', email: '' },
  entryModal: { isOpen: false, creditScore: '' },
  filters: {
    creditScore: '',
    zipCode: '',
    propertyValue: '',
    loanAmount: '',
    downPayment: '',
    loanTerm: '',
    militaryStatus: '',
    dtiRatio: '',
    mortgagePoints: '',
    propertyType: '',
    propertyUse: '',
    includeFHA: false,
  },
  filtersLocked: true,
  isEditingFilters: false,
  isFindingOffers: false,
  isUpdatingOffers: false,
  offers: [],
  additionalOffers: [],
  showMoreOffers: false,
  getQuoteModal: {
    isOpen: false,
    step: 1,
    selectedLenders: [],
    email: '',
    phone: '',
    disclosureAccepted: false,
    isSubmitting: false,
  },
  hasEnteredMarketplace: false,
}

const generateFakeOffers = (): Offer[] => [
  { id: 'offer-1', lenderName: 'First National Bank', nmls: '#3304', rate: '6.875%', apr: '7.125%', monthlyPayment: '$4,478', loanType: '30-year Fixed', closingCosts: '$8,500' },
  { id: 'offer-2', lenderName: 'Metro Mortgage Corp', nmls: '#2156', rate: '6.950%', apr: '7.200%', monthlyPayment: '$4,526', loanType: '30-year Fixed', closingCosts: '$7,800' },
  { id: 'offer-3', lenderName: 'Coastal Credit Union', nmls: '#1789', rate: '7.000%', apr: '7.250%', monthlyPayment: '$4,559', loanType: '30-year Fixed', closingCosts: '$8,200' },
]

const generateAdditionalOffers = (): Offer[] => [
  { id: 'offer-4', lenderName: 'Horizon Home Lending', nmls: '#4521', rate: '7.050%', apr: '7.275%', monthlyPayment: '$4,592', loanType: '30-year Fixed', closingCosts: '$8,750' },
  { id: 'offer-5', lenderName: 'Liberty Financial Group', nmls: '#5892', rate: '7.100%', apr: '7.325%', monthlyPayment: '$4,625', loanType: '30-year Fixed', closingCosts: '$8,300' },
  { id: 'offer-6', lenderName: 'Summit Lending Partners', nmls: '#6734', rate: '7.125%', apr: '7.350%', monthlyPayment: '$4,641', loanType: '30-year Fixed', closingCosts: '$7,950' },
  { id: 'offer-7', lenderName: 'Nationwide Trust Bank', nmls: '#7208', rate: '7.150%', apr: '7.375%', monthlyPayment: '$4,658', loanType: '30-year Fixed', closingCosts: '$8,600' },
]

export const usePrototypeStore = create<PrototypeStore>((set, get) => ({
  currentTab: 'agency-admin',
  agencyAdminForm: initialAgencyAdminForm,
  agentSignupForm: initialAgentSignupForm,
  agentDashboard: initialAgentDashboard,
  privateMarketplace: initialPrivateMarketplace,

  setCurrentTab: (tab) => {
    set({ currentTab: tab })
    if (tab === 'private-marketplace') {
      const state = get()
      if (!state.privateMarketplace.hasEnteredMarketplace) {
        set({
          privateMarketplace: {
            ...state.privateMarketplace,
            buyerIdentity: { firstName: 'James', lastName: 'Walker', email: 'james.walker@email.com' },
            filters: {
              creditScore: '',
              zipCode: '10011',
              propertyValue: '$850,000',
              loanAmount: '$680,000',
              downPayment: '20',
              loanTerm: '30 year fixed',
              militaryStatus: 'Non-Military',
              dtiRatio: 'lt40',
              mortgagePoints: 'All',
              propertyType: 'Single Family',
              propertyUse: 'Primary',
              includeFHA: false,
            },
            entryModal: { ...state.privateMarketplace.entryModal, isOpen: true },
          },
        })
      }
    }
  },

  prefillCurrentTab: () => {
    const state = get()
    const { currentTab } = state
    if (currentTab === 'agency-admin') {
      set({
        agencyAdminForm: {
          agencyName: 'Horizon Realty Group',
          adminName: 'Sarah Mitchell',
          adminEmail: 'sarah@horizonrealty.com',
          password: 'Password123!',
          logoFilename: 'horizon-logo.png',
          isSubmitted: false,
        },
      })
    } else if (currentTab === 'agent-signup') {
      set({
        agentSignupForm: {
          firstName: 'Daniel',
          lastName: 'Reyes',
          email: 'daniel@horizonrealty.com',
          password: 'Password123!',
          isSubmitted: false,
        },
      })
    } else if (currentTab === 'agent-dashboard') {
      const now = new Date()
      set({
        agentDashboard: {
          ...state.agentDashboard,
          leads: [
            {
              id: 'lead-1',
              firstName: 'Stacy',
              lastName: 'Barnes',
              email: 'stacy.barnes@email.com',
              status: 'Pending',
              sentAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
              linkUrl: 'https://marketplace.bankrate.com/invite/abc123',
              formSnapshot: {
                firstName: 'Stacy',
                lastName: 'Barnes',
                email: 'stacy.barnes@email.com',
                zipCode: '10011',
                propertyValue: '$850,000',
                loanAmount: '$680,000',
                downPayment: '20',
                creditScore: '',
                loanTerm: '30 year fixed',
                militaryStatus: 'Non-Military',
                dtiRatio: 'lt40',
                mortgagePoints: 'All',
                propertyType: 'Single Family',
                propertyUse: 'Primary',
                includeFHA: false,
              },
            },
            {
              id: 'lead-2',
              firstName: 'Lewis',
              lastName: 'Hamilton',
              email: 'lewis.hamilton@email.com',
              status: 'Pending',
              sentAt: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000),
              linkUrl: 'https://marketplace.bankrate.com/invite/def456',
              formSnapshot: { email: 'lewis.hamilton@email.com' },
            },
            {
              id: 'lead-3',
              firstName: 'Michael',
              lastName: 'Tran',
              email: 'michael.tran@email.com',
              status: 'Completed',
              sentAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
              linkUrl: 'https://marketplace.bankrate.com/invite/ghi789',
              formSnapshot: { email: 'michael.tran@email.com' },
            },
          ],
        },
      })
    } else if (currentTab === 'private-marketplace') {
      set({
        privateMarketplace: {
          ...state.privateMarketplace,
          buyerIdentity: { firstName: 'James', lastName: 'Walker', email: 'james.walker@email.com' },
          filters: {
            creditScore: '',
            zipCode: '10011',
            propertyValue: '$850,000',
            loanAmount: '$680,000',
            downPayment: '20',
            loanTerm: '30 year fixed',
            militaryStatus: 'Non-Military',
            dtiRatio: 'lt40',
            mortgagePoints: 'All',
            propertyType: 'Single Family',
            propertyUse: 'Primary',
            includeFHA: false,
          },
        },
      })
    }
  },

  resetCurrentTab: () => {
    const { currentTab } = get()
    if (currentTab === 'agency-admin') set({ agencyAdminForm: initialAgencyAdminForm })
    else if (currentTab === 'agent-signup') set({ agentSignupForm: initialAgentSignupForm })
    else if (currentTab === 'agent-dashboard') set({ agentDashboard: initialAgentDashboard })
    else if (currentTab === 'private-marketplace') set({ privateMarketplace: initialPrivateMarketplace })
  },

  allReset: () => {
    set({
      currentTab: 'agency-admin',
      agencyAdminForm: initialAgencyAdminForm,
      agentSignupForm: initialAgentSignupForm,
      agentDashboard: initialAgentDashboard,
      privateMarketplace: initialPrivateMarketplace,
    })
  },

  updateAgencyAdminForm: (field, value) => {
    set({ agencyAdminForm: { ...get().agencyAdminForm, [field]: value } })
  },

  submitAgencyForm: () => {
    set({ agencyAdminForm: { ...get().agencyAdminForm, isSubmitted: true } })
  },

  copyAgencyLink: () => {
    navigator.clipboard.writeText('https://marketplace.bankrate.com/agency/invite/xyz789')
  },

  updateAgentSignupForm: (field, value) => {
    set({ agentSignupForm: { ...get().agentSignupForm, [field]: value } })
  },

  submitAgentSignup: () => {
    set({ agentSignupForm: { ...get().agentSignupForm, isSubmitted: true } })
  },

  navigateToAgentDashboard: () => {
    set({ currentTab: 'agent-dashboard' })
  },

  openCreateLinkModal: () => {
    set({ agentDashboard: { ...get().agentDashboard, createLinkModal: { ...initialCreateLinkModal, isOpen: true } } })
  },

  closeCreateLinkModal: () => {
    set({ agentDashboard: { ...get().agentDashboard, createLinkModal: initialCreateLinkModal } })
  },

  updateCreateLinkField: (field, value) => {
    set({
      agentDashboard: {
        ...get().agentDashboard,
        createLinkModal: {
          ...get().agentDashboard.createLinkModal,
          formFields: { ...get().agentDashboard.createLinkModal.formFields, [field]: value },
        },
      },
    })
  },

  prefillCreateLink: () => {
    set({
      agentDashboard: {
        ...get().agentDashboard,
        createLinkModal: {
          ...get().agentDashboard.createLinkModal,
          formFields: {
            firstName: 'James', lastName: 'Walker', email: 'james.walker@email.com',
            zipCode: '10011', propertyValue: '$850,000', loanAmount: '$680,000',
            downPayment: '20', creditScore: '', loanTerm: '30 year fixed',
            militaryStatus: 'Non-Military', dtiRatio: 'lt40', mortgagePoints: 'All',
            propertyType: 'Single Family', propertyUse: 'Primary', includeFHA: false,
          },
        },
      },
    })
  },

  generateLink: () => {
    const state = get()
    set({
      agentDashboard: {
        ...state.agentDashboard,
        createLinkModal: { ...state.agentDashboard.createLinkModal, isLoading: true },
      },
    })
    setTimeout(() => {
      const fields = state.agentDashboard.createLinkModal.formFields
      const newLinkUrl = `https://marketplace.bankrate.com/invite/${Date.now()}`
      const newLead: Lead = {
        id: `lead-${Date.now()}`,
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        status: 'Pending',
        sentAt: new Date(),
        linkUrl: newLinkUrl,
        formSnapshot: { ...fields },
      }
      set({
        agentDashboard: {
          ...get().agentDashboard,
          leads: [newLead, ...get().agentDashboard.leads],
          createLinkModal: {
            ...get().agentDashboard.createLinkModal,
            isLoading: false,
            isSuccess: true,
            generatedLink: newLinkUrl,
          },
        },
      })
    }, 1500)
  },

  copyCreateLink: () => {
    const link = get().agentDashboard.createLinkModal.generatedLink
    navigator.clipboard.writeText(link)
    set({ agentDashboard: { ...get().agentDashboard, createLinkModal: { ...get().agentDashboard.createLinkModal, copied: true } } })
    setTimeout(() => {
      set({ agentDashboard: { ...get().agentDashboard, createLinkModal: { ...get().agentDashboard.createLinkModal, copied: false } } })
    }, 2000)
  },

  copyLeadLink: (leadId) => {
    const lead = get().agentDashboard.leads.find(l => l.id === leadId)
    if (lead) {
      navigator.clipboard.writeText(lead.linkUrl)
      set({ agentDashboard: { ...get().agentDashboard, copiedLeadId: leadId } })
      setTimeout(() => {
        set({ agentDashboard: { ...get().agentDashboard, copiedLeadId: null } })
      }, 2000)
    }
  },

  openRegenerateModal: (leadId) => {
    set({
      agentDashboard: {
        ...get().agentDashboard,
        regenerateModal: { isOpen: true, selectedLeadId: leadId, isLoading: false, newLink: '', copied: false },
      },
    })
  },

  closeRegenerateModal: () => {
    set({
      agentDashboard: {
        ...get().agentDashboard,
        regenerateModal: { isOpen: false, selectedLeadId: null, isLoading: false, newLink: '', copied: false },
      },
    })
  },

  regenerateLink: () => {
    const state = get()
    const leadId = state.agentDashboard.regenerateModal.selectedLeadId
    if (!leadId) return
    set({ agentDashboard: { ...state.agentDashboard, regenerateModal: { ...state.agentDashboard.regenerateModal, isLoading: true } } })
    setTimeout(() => {
      const newLink = `https://marketplace.bankrate.com/invite/${Date.now()}`
      set({
        agentDashboard: {
          ...get().agentDashboard,
          leads: get().agentDashboard.leads.map(lead =>
            lead.id === leadId ? { ...lead, linkUrl: newLink, sentAt: new Date() } : lead
          ),
          regenerateModal: { ...get().agentDashboard.regenerateModal, isLoading: false, newLink },
        },
      })
    }, 1000)
  },

  copyRegeneratedLink: () => {
    const link = get().agentDashboard.regenerateModal.newLink
    navigator.clipboard.writeText(link)
    set({ agentDashboard: { ...get().agentDashboard, regenerateModal: { ...get().agentDashboard.regenerateModal, copied: true } } })
    setTimeout(() => {
      set({ agentDashboard: { ...get().agentDashboard, regenerateModal: { ...get().agentDashboard.regenerateModal, copied: false } } })
    }, 2000)
  },

  openLeadDetail: (leadId) => {
    set({ agentDashboard: { ...get().agentDashboard, leadDetailModal: { isOpen: true, selectedLeadId: leadId } } })
  },

  closeLeadDetail: () => {
    set({ agentDashboard: { ...get().agentDashboard, leadDetailModal: { isOpen: false, selectedLeadId: null } } })
  },

  updateLeadStatus: (email, status) => {
    set({
      agentDashboard: {
        ...get().agentDashboard,
        leads: get().agentDashboard.leads.map(lead => lead.email === email ? { ...lead, status } : lead),
      },
    })
  },

  openEntryModal: () => {
    set({ privateMarketplace: { ...get().privateMarketplace, entryModal: { ...get().privateMarketplace.entryModal, isOpen: true } } })
  },

  closeEntryModal: () => {
    set({ privateMarketplace: { ...get().privateMarketplace, entryModal: { ...get().privateMarketplace.entryModal, isOpen: false } } })
  },

  updateEntryCreditScore: (score) => {
    set({ privateMarketplace: { ...get().privateMarketplace, entryModal: { ...get().privateMarketplace.entryModal, creditScore: score } } })
  },

  findOffers: () => {
    const state = get()
    const creditScore = state.privateMarketplace.entryModal.creditScore
    set({
      privateMarketplace: {
        ...state.privateMarketplace,
        entryModal: { ...state.privateMarketplace.entryModal, isOpen: false },
        filters: { ...state.privateMarketplace.filters, creditScore },
        isFindingOffers: true,
        hasEnteredMarketplace: true,
      },
    })
    setTimeout(() => {
      set({
        privateMarketplace: {
          ...get().privateMarketplace,
          isFindingOffers: false,
          offers: generateFakeOffers(),
          additionalOffers: generateAdditionalOffers(),
          filtersLocked: true,
        },
      })
    }, 3000)
  },

  editFilters: () => {
    set({ privateMarketplace: { ...get().privateMarketplace, filtersLocked: false, isEditingFilters: true } })
  },

  updateFilter: (field, value) => {
    set({ privateMarketplace: { ...get().privateMarketplace, filters: { ...get().privateMarketplace.filters, [field]: value } } })
  },

  updateOffers: () => {
    set({ privateMarketplace: { ...get().privateMarketplace, isUpdatingOffers: true, filtersLocked: true, isEditingFilters: false } })
    setTimeout(() => {
      set({ privateMarketplace: { ...get().privateMarketplace, isUpdatingOffers: false } })
    }, 3000)
  },

  lockFilters: () => {
    set({ privateMarketplace: { ...get().privateMarketplace, filtersLocked: true, isEditingFilters: false } })
  },

  toggleShowMoreOffers: () => {
    set({ privateMarketplace: { ...get().privateMarketplace, showMoreOffers: !get().privateMarketplace.showMoreOffers } })
  },

  openGetQuoteModal: (lenderId) => {
    set({
      privateMarketplace: {
        ...get().privateMarketplace,
        getQuoteModal: {
          isOpen: true, step: 1, selectedLenders: [lenderId],
          email: get().privateMarketplace.buyerIdentity.email,
          phone: '', disclosureAccepted: false, isSubmitting: false,
        },
      },
    })
  },

  closeGetQuoteModal: () => {
    set({
      privateMarketplace: {
        ...get().privateMarketplace,
        getQuoteModal: { isOpen: false, step: 1, selectedLenders: [], email: '', phone: '', disclosureAccepted: false, isSubmitting: false },
      },
    })
  },

  setQuoteStep: (step) => {
    set({ privateMarketplace: { ...get().privateMarketplace, getQuoteModal: { ...get().privateMarketplace.getQuoteModal, step } } })
  },

  toggleLenderSelection: (lenderId) => {
    const current = get().privateMarketplace.getQuoteModal.selectedLenders
    const isSelected = current.includes(lenderId)
    set({
      privateMarketplace: {
        ...get().privateMarketplace,
        getQuoteModal: {
          ...get().privateMarketplace.getQuoteModal,
          selectedLenders: isSelected ? current.filter(id => id !== lenderId) : [...current, lenderId],
        },
      },
    })
  },

  updateQuoteField: (field, value) => {
    set({ privateMarketplace: { ...get().privateMarketplace, getQuoteModal: { ...get().privateMarketplace.getQuoteModal, [field]: value } } })
  },

  submitQuoteRequest: () => {
    set({ privateMarketplace: { ...get().privateMarketplace, getQuoteModal: { ...get().privateMarketplace.getQuoteModal, isSubmitting: true } } })
    setTimeout(() => {
      get().updateLeadStatus('james.walker@email.com', 'Completed')
      set({ privateMarketplace: { ...get().privateMarketplace, getQuoteModal: { ...get().privateMarketplace.getQuoteModal, isSubmitting: false, step: 3 } } })
    }, 1500)
  },
}))
