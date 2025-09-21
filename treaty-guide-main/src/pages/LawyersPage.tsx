import LawyerFinder from '@/components/LawyerFinder';

const LawyersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-legal-text">Find Legal Experts</h1>
        <p className="text-legal-text-muted">Connect with qualified lawyers based on your location and needs</p>
      </div>
      
      <LawyerFinder />
    </div>
  );
};

export default LawyersPage;