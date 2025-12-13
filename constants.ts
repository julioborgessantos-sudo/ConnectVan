import { Driver, Partner, Discount, UserRole, User, MaintenanceRecord } from './types';

export const DEFAULT_HERO_IMAGES = [
  "https://images.unsplash.com/photo-1571210862729-78a52d3779a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // Kids entering school bus
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80", // School bus on road
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"  // Kids studying/happy
];

export const MOCK_DRIVERS: Driver[] = [
  {
    id: 'd1',
    userId: 'u2',
    name: 'Roberto Silva',
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    vehicle: 'Mercedes Sprinter 2022',
    route: 'Cidade Nova - Zona Leste',
    schools: ['SESI 298', 'E.E. José Gabriel de Oliveira', 'Colégio Pilares'],
    rating: 4.8,
    phone: '(19) 99999-1234',
    bio: 'Transporte seguro e pontual atendendo a região da Zona Leste há mais de 10 anos. Monitora presente em todas as viagens.'
  },
  {
    id: 'd2',
    userId: 'u3',
    name: 'Ana Oliveira',
    photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    vehicle: 'Fiat Ducato 2020',
    route: 'Mollon - Jd. Ipiranga',
    schools: ['Colégio Anglo', 'E.E. Emílio Romi', 'Objetivo'],
    rating: 4.9,
    phone: '(19) 98888-5678',
    bio: 'Mãe e motorista. Cuidado especial com os pequenos do maternal. Veículo equipado com cadeirinhas.'
  },
  {
    id: 'd3',
    userId: 'u4',
    name: 'Carlos Santos',
    photoUrl: 'https://randomuser.me/api/portraits/men/85.jpg',
    vehicle: 'Renault Master 2023',
    route: 'Centro - Vila Grego',
    schools: ['Colégio Ideal', 'E.E. Comendador Emílio Romi'],
    rating: 4.7,
    phone: '(19) 97777-4321',
    bio: 'Ar condicionado, TV e WiFi. Conforto total para os estudantes do ensino médio e fundamental.'
  },
  {
    id: 'd4',
    userId: 'u8',
    name: 'Marcia Ferreira',
    photoUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    vehicle: 'Citroën Jumper',
    route: 'Jd. Europa - Pq. Olaria',
    schools: ['SESI 298', 'CIEP'],
    rating: 5.0,
    phone: '(19) 99111-2233',
    bio: 'Pontualidade britânica e tratamento familiar. Vagas abertas para o período da tarde.'
  }
];

export const MOCK_PARTNERS: Partner[] = [
  {
    id: 'p1',
    userId: 'u5',
    name: 'Auto Center SBO',
    category: 'Oficina Mecânica',
    description: 'Especialista em vans e utilitários. Suspensão, freios, motor e revisão completa para escolares.',
    photoUrl: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    address: 'Av. Santa Bárbara, 2000 - Vila Mollon',
    phone: '(19) 3455-0000'
  },
  {
    id: 'p2',
    userId: 'u6',
    name: 'Papelaria Criativa',
    category: 'Papelaria',
    description: 'Material escolar completo das listas das escolas da região com descontos para pais e motoristas.',
    photoUrl: 'https://images.unsplash.com/photo-1598620617377-3bfb505b4376?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    address: 'Rua Dona Margarida, 500 - Centro',
    phone: '(19) 3455-1111'
  },
  {
    id: 'p3',
    userId: 'u7',
    name: 'Lava-Rápido Brilho',
    category: 'Lava-Rápido',
    description: 'Lavagem completa, polimento e higienização interna especializada para vans escolares.',
    photoUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    address: 'Av. Monte Castelo, 800 - Jd. Primavera',
    phone: '(19) 3455-2222'
  }
];

export const MOCK_DISCOUNTS: Discount[] = [
  {
    id: 'disc1',
    partnerId: 'p1',
    partnerName: 'Auto Center SBO',
    title: 'Troca de Óleo',
    description: '30% de desconto na troca de óleo e filtro para vans cadastradas.',
    percentageOff: 30,
    code: 'OLEO30',
    expiryDate: '2024-12-31'
  },
  {
    id: 'disc2',
    partnerId: 'p1',
    partnerName: 'Auto Center SBO',
    title: 'Alinhamento e Balanceamento',
    description: 'Preço fixo de R$ 80,00 para o combo.',
    percentageOff: 20,
    code: 'ALINHA20',
    expiryDate: '2024-12-31'
  },
  {
    id: 'disc3',
    partnerId: 'p3',
    partnerName: 'Lava-Rápido Brilho',
    title: 'Higienização Interna',
    description: 'Desconto especial para remoção de manchas e limpeza de bancos.',
    percentageOff: 15,
    code: 'LIMPA15',
    expiryDate: '2024-11-30'
  }
];

// USUÁRIOS MOCKADOS PARA LOGIN
export const MOCK_USER_CLIENT: User = {
  id: 'u1',
  name: 'João da Silva (Pai)',
  email: 'pai@exemplo.com',
  role: UserRole.CLIENT,
  avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg'
};

export const MOCK_USER_DRIVER: User = {
  id: 'u2',
  name: 'Roberto Silva (Motorista)',
  email: 'roberto@exemplo.com',
  role: UserRole.DRIVER,
  avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
};

export const MOCK_USER_PARTNER: User = {
  id: 'u5',
  name: 'Auto Center SBO (Parceiro)',
  email: 'oficina@parceiro.com',
  role: UserRole.PARTNER,
  avatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg'
};

export const MOCK_USER_ADMIN: User = {
  id: 'admin1',
  name: 'Administrador',
  email: 'admin@vanconnect.com',
  role: UserRole.ADMIN,
  avatarUrl: 'https://randomuser.me/api/portraits/lego/5.jpg'
};

export const MOCK_MAINTENANCE_HISTORY: MaintenanceRecord[] = [
  {
    id: 'm1',
    date: '2024-02-15',
    type: 'OLEO',
    km: 120500,
    description: 'Troca de óleo sintético e filtro de óleo.',
    cost: 450.00,
    nextDueKm: 130500
  },
  {
    id: 'm2',
    date: '2024-01-10',
    type: 'PNEUS',
    km: 118000,
    description: 'Troca de 2 pneus dianteiros e alinhamento.',
    cost: 1200.00,
    nextDueKm: 168000
  },
  {
    id: 'm3',
    date: '2023-11-20',
    type: 'FREIOS',
    km: 115000,
    description: 'Troca de pastilhas de freio dianteiras.',
    cost: 320.00,
    nextDueKm: 145000
  }
];