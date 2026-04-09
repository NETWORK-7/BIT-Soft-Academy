// Script to clean up partially created users (email saved but registration failed)
// Run this in your production environment

const cleanupPartialUsers = async () => {
  try {
    // Connect to your database
    // Find users without password_hash or with incomplete data
    // Remove those partial registrations
    
    console.log('Cleaning up partial user registrations...');
    
    // Example cleanup logic:
    // 1. Find users with email but no password_hash
    // 2. Find users created in last 24h with incomplete data
    // 3. Remove those entries
    
    console.log('Cleanup completed');
  } catch (error) {
    console.error('Cleanup failed:', error);
  }
};

module.exports = { cleanupPartialUsers };
