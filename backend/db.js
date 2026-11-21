const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_FILE = path.join(__dirname, 'data', 'database.json');

// Default initial state
const defaultData = {
  users: [
    {
      id: 'usr_admin',
      name: 'System Administrator',
      email: 'admin@aryaseva.com',
      passwordHash: bcrypt.hashSync('admin123', 10),
      role: 'admin',
      phone: '7774946121',
      createdAt: new Date(Date.now() - 30 * 86400000).toISOString()
    },
    {
      id: 'usr_demo_customer',
      name: 'Rohan Deshmukh',
      email: 'customer@example.com',
      passwordHash: bcrypt.hashSync('customer123', 10),
      role: 'customer',
      phone: '9822334455',
      createdAt: new Date(Date.now() - 15 * 86400000).toISOString()
    }
  ],
  requests: [
    {
      id: 'REQ-2026-0891',
      customerId: 'usr_demo_customer',
      customerName: 'Rohan Deshmukh',
      customerEmail: 'customer@example.com',
      customerPhone: '9822334455',
      serviceId: 101,
      serviceName: 'Aadhaar Card Biometric Update',
      category: 'Identity',
      status: 'fulfilled',
      notes: 'Biometric update appointment completed at center. Acknowledgement slip generated.',
      operatorRemarks: 'Verified against UIDAI central portal. Updated successfully.',
      fee: 100,
      trackingNumber: 'UID-PUN-98214',
      documents: [
        { name: 'Identity Proof', originalName: 'old_aadhaar.pdf', url: '/uploads/sample_doc.pdf' },
        { name: 'Address Proof', originalName: 'electricity_bill.pdf', url: '/uploads/sample_doc.pdf' }
      ],
      createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
      completedAt: new Date(Date.now() - 8 * 86400000).toISOString()
    },
    {
      id: 'REQ-2026-0942',
      customerId: 'usr_demo_customer',
      customerName: 'Rohan Deshmukh',
      customerEmail: 'customer@example.com',
      customerPhone: '9822334455',
      serviceId: 201,
      serviceName: 'Domicile & Age Nationality Certificate',
      category: 'Certificates',
      status: 'in_progress',
      notes: 'Applied on Aaple Sarkar. Tehsildar desk verification in progress.',
      operatorRemarks: 'Documents scanned and submitted to Tahsildar Haveli Pune.',
      fee: 250,
      trackingNumber: 'MH-DOM-2026-4432',
      documents: [
        { name: 'School Leaving Certificate', originalName: 'lc_certificate.pdf', url: '/uploads/sample_doc.pdf' },
        { name: 'Ration Card', originalName: 'ration_card.jpg', url: '/uploads/sample_doc.pdf' }
      ],
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      completedAt: null
    },
    {
      id: 'REQ-2026-1005',
      customerId: 'usr_demo_customer',
      customerName: 'Rohan Deshmukh',
      customerEmail: 'customer@example.com',
      customerPhone: '9822334455',
      serviceId: 301,
      serviceName: 'Shop Act (Gumasta) License',
      category: 'Business',
      status: 'pending',
      notes: 'New retail grocery shop in Akurdi. Needs fast processing.',
      operatorRemarks: 'Awaiting signature verification.',
      fee: 500,
      trackingNumber: 'PCMC-GUM-7761',
      documents: [
        { name: 'Shop Front Photo with Board', originalName: 'shop_photo.jpg', url: '/uploads/sample_doc.pdf' },
        { name: 'Rent Agreement', originalName: 'rent_agreement.pdf', url: '/uploads/sample_doc.pdf' }
      ],
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
      completedAt: null
    },
    {
      id: 'REQ-2026-1012',
      customerId: 'usr_customer_prakash',
      customerName: 'Prakash Patil',
      customerEmail: 'prakash.patil@gmail.com',
      customerPhone: '9765432109',
      serviceId: 202,
      serviceName: 'Income Certificate (3 Years)',
      category: 'Certificates',
      status: 'fulfilled',
      notes: 'Required for college engineering scholarship.',
      operatorRemarks: 'Tahsildar approved certificate signed digitally.',
      fee: 150,
      trackingNumber: 'INC-2026-9021',
      documents: [
        { name: 'Salary Slip / Talathi Dakhla', originalName: 'income_proof.pdf', url: '/uploads/sample_doc.pdf' },
        { name: 'Aadhaar Card', originalName: 'aadhaar_front.jpg', url: '/uploads/sample_doc.pdf' }
      ],
      createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      completedAt: new Date(Date.now() - 3 * 86400000).toISOString()
    },
    {
      id: 'REQ-2026-1018',
      customerId: 'usr_customer_anita',
      customerName: 'Anita Shinde',
      customerEmail: 'anita.s@yahoo.com',
      customerPhone: '9823098765',
      serviceId: 504,
      serviceName: 'Ladki Bahin Yojana e-KYC & Registration',
      category: 'Financial',
      status: 'pending',
      notes: 'Bank Aadhaar linking assistance requested.',
      operatorRemarks: 'Queued for biometric DBT verification.',
      fee: 50,
      trackingNumber: 'LBY-MAHA-4312',
      documents: [
        { name: 'Bank Passbook', originalName: 'bank_passbook.pdf', url: '/uploads/sample_doc.pdf' },
        { name: 'Aadhaar Card', originalName: 'aadhaar.pdf', url: '/uploads/sample_doc.pdf' }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null
    }
  ]
};

// Ensure data file exists
function initDB() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

// Read whole DB
function readDB() {
  initDB();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB, using default data:', err);
    return defaultData;
  }
}

// Write whole DB safely (atomic write via temp file)
function writeDB(data) {
  initDB();
  const tempFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

module.exports = {
  readDB,
  writeDB,
  initDB
};
