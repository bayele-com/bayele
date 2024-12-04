interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  createdAt: string;
}

export const generateRecommendations = (userType: string, profileData: any): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  // Basic profile recommendations
  if (!profileData?.full_name) {
    recommendations.push({
      id: '1',
      title: 'Complete Your Profile',
      description: 'Add your full name to increase trust with potential clients.',
      priority: 'high',
      category: 'Profile',
      createdAt: new Date().toISOString(),
    });
  }

  if (!profileData?.whatsapp_number) {
    recommendations.push({
      id: '2',
      title: 'Add WhatsApp Contact',
      description: 'Adding your WhatsApp number makes it easier for clients to reach you.',
      priority: 'medium',
      category: 'Profile',
      createdAt: new Date().toISOString(),
    });
  }

  // User type specific recommendations
  switch (userType) {
    case 'business':
      recommendations.push({
        id: '3',
        title: 'List Your First Property',
        description: 'Start by adding your first property listing to attract potential tenants.',
        priority: 'high',
        category: 'Listings',
        createdAt: new Date().toISOString(),
      });
      break;
    case 'affiliate':
      recommendations.push({
        id: '4',
        title: 'Create Your First Link',
        description: 'Generate your first affiliate link to start earning commissions.',
        priority: 'high',
        category: 'Earnings',
        createdAt: new Date().toISOString(),
      });
      break;
    default:
      recommendations.push({
        id: '5',
        title: 'Explore Available Properties',
        description: 'Browse through our selection of properties to find your perfect match.',
        priority: 'medium',
        category: 'General',
        createdAt: new Date().toISOString(),
      });
  }

  return recommendations;
};