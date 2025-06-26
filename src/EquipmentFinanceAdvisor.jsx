import React, { useState } from 'react';
import { ChevronRight, DollarSign, Settings, TrendingUp, FileText, Users, Phone } from 'lucide-react';

const EquipmentFinanceAdvisor = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [selections, setSelections] = useState({
    painPoints: [],
    equipmentType: '',
    financialGoals: [],
    companySize: '',
    timeframe: ''
  });
  const [showResults, setShowResults] = useState(false);

  const painPoints = [
    { id: 'cashflow', label: 'Cash Flow Strain During Capex Cycles', icon: DollarSign },
    { id: 'creditline', label: 'Eroding Line of Credit Capacity', icon: TrendingUp },
    { id: 'balancesheet', label: 'Balance Sheet Heaviness', icon: FileText },
    { id: 'obsolescence', label: 'Equipment Obsolescence Risk', icon: Settings },
    { id: 'budget', label: 'Budget Variability & Unpredictable Cash Demands', icon: DollarSign },
    { id: 'growth', label: 'Missed Growth Opportunities Due to Delayed Capex', icon: TrendingUp },
    { id: 'vendor', label: 'Vendor Power in Pricing and Payment Terms', icon: Users },
    { id: 'coordination', label: 'Difficulty Coordinating Multi-Vendor Projects', icon: Settings },
    { id: 'maintenance', label: 'Pressure to Maintain Obsolete Equipment', icon: Settings },
    { id: 'regulatory', label: 'Regulatory or Safety Upgrade Pressure', icon: FileText },
    { id: 'uncertainty', label: 'Inflexible Capex Planning During Economic Uncertainty', icon: TrendingUp },
    { id: 'capacity', label: 'Inability to Flex Capacity Without Overcommitting', icon: Settings },
    { id: 'valuation', label: 'Negative Impact on Enterprise Value from High Capex', icon: FileText }
  ];

  const equipmentTypes = [
    'Manufacturing Equipment & Machinery',
    'Medical & Healthcare Equipment',
    'Transportation & Fleet Vehicles',
    'Construction Equipment',
    'Technology & IT Infrastructure',
    'Agricultural Equipment',
    'Food Service & Restaurant Equipment',
    'Office Equipment & Furniture'
  ];

  const financialGoals = [
    { id: 'preserve_cash', label: 'Preserve Working Capital' },
    { id: 'improve_ratios', label: 'Improve Financial Ratios' },
    { id: 'tax_benefits', label: 'Maximize Tax Benefits' },
    { id: 'predictable_payments', label: 'Predictable Monthly Payments' },
    { id: 'flexible_terms', label: 'Flexible Terms & Early Buyout Options' },
    { id: 'preserve_credit', label: 'Preserve Bank Credit Lines' },
    { id: 'match_revenue', label: 'Match Payments to Revenue Cycles' }
  ];

  const companySizes = [
    '$10-25M Revenue',
    '$25-50M Revenue', 
    '$50-100M Revenue',
    '$100M+ Revenue'
  ];

  const timeframes = [
    'Immediate (0-3 months)',
    'Near-term (3-6 months)',
    'Mid-term (6-12 months)',
    'Long-term (12+ months)'
  ];

  const getRecommendations = () => {
    const recommendations = [];
    
    // Operating Lease recommendations
    if (selections.painPoints.includes('obsolescence') || 
        selections.painPoints.includes('capacity') || 
        selections.painPoints.includes('uncertainty')) {
      recommendations.push({
        type: 'Operating Lease',
        description: 'Keep equipment off balance sheet with flexible terms',
        benefits: [
          'No ownership risk - return equipment when done',
          'Predictable monthly payments',
          'Technology refresh options',
          'Preserve credit capacity'
        ],
        bestFor: 'Technology, medical equipment, vehicles with high obsolescence risk'
      });
    }

    // Capital Lease/Finance Lease recommendations  
    if (selections.painPoints.includes('cashflow') || 
        selections.painPoints.includes('creditline') ||
        selections.financialGoals.includes('tax_benefits')) {
      recommendations.push({
        type: 'Capital Lease (Finance Lease)',
        description: 'Own the equipment while preserving cash flow',
        benefits: [
          'Preserve working capital',
          'Potential tax advantages',
          'Build equity in equipment',
          'Fixed monthly payments'
        ],
        bestFor: 'Manufacturing equipment, essential business assets'
      });
    }

    // TRAC Lease recommendations
    if (selections.equipmentType === 'Transportation & Fleet Vehicles') {
      recommendations.push({
        type: 'TRAC Lease (Terminal Rental Adjustment)',
        description: 'Fleet-specific lease with residual value adjustments',
        benefits: [
          'Lower monthly payments vs. capital lease',
          'Shared residual risk with lessor',
          'Fleet management flexibility',
          'Potential tax benefits'
        ],
        bestFor: 'Commercial vehicles, truck fleets, specialized transportation'
      });
    }

    // Equipment Term Loan recommendations
    if (selections.painPoints.includes('vendor') || 
        selections.financialGoals.includes('preserve_credit')) {
      recommendations.push({
        type: 'Equipment Term Loan',
        description: 'Traditional financing with equipment as collateral',
        benefits: [
          'Immediate ownership',
          'Competitive interest rates',
          'Preserve bank credit lines',
          'Strengthen vendor negotiations'
        ],
        bestFor: 'Essential equipment, high-value machinery, proven technology'
      });
    }

    // Sale-Leaseback recommendations
    if (selections.painPoints.includes('balancesheet') || 
        selections.painPoints.includes('cashflow') ||
        selections.financialGoals.includes('preserve_cash')) {
      recommendations.push({
        type: 'Sale-Leaseback',
        description: 'Convert owned equipment to cash while retaining use',
        benefits: [
          'Immediate cash infusion',
          'Continue using equipment',
          'Improve balance sheet ratios',
          'Free up capital for growth'
        ],
        bestFor: 'Existing equipment you own, real estate, large machinery'
      });
    }

    // Default recommendations if none match
    if (recommendations.length === 0) {
      recommendations.push(
        {
          type: 'Operating Lease',
          description: 'Keep equipment off balance sheet with flexible terms',
          benefits: [
            'Preserve working capital',
            'Predictable payments',
            'Technology refresh options',
            'Lower monthly payments'
          ],
          bestFor: 'Most equipment types, especially technology'
        },
        {
          type: 'Capital Lease',
          description: 'Own the equipment while preserving cash flow',
          benefits: [
            'Build equity in equipment',
            'Potential tax advantages',
            'Fixed monthly payments',
            'Preserve cash for operations'
          ],
          bestFor: 'Essential business equipment, manufacturing assets'
        }
      );
    }

    return recommendations;
  };

  const handleSelection = (category, value) => {
    if (category === 'painPoints') {
      const newPainPoints = selections.painPoints.includes(value)
        ? selections.painPoints.filter(p => p !== value)
        : [...selections.painPoints, value];
      setSelections(prev => ({ ...prev, painPoints: newPainPoints }));
    } else if (category === 'financialGoals') {
      const newGoals = selections.financialGoals.includes(value)
        ? selections.financialGoals.filter(g => g !== value)
        : [...selections.financialGoals, value];
      setSelections(prev => ({ ...prev, financialGoals: newGoals }));
    } else {
      setSelections(prev => ({ ...prev, [category]: value }));
    }
  };

  const nextStep = () => {
    const steps = ['start', 'painPoints', 'equipmentType', 'financialGoals', 'companySize', 'timeframe', 'results'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
    if (steps[currentIndex + 1] === 'results') {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    const steps = ['start', 'painPoints', 'equipmentType', 'financialGoals', 'companySize', 'timeframe', 'results'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      setShowResults(false);
    }
  };

  const reset = () => {
    setCurrentStep('start');
    setSelections({
      painPoints: [],
      equipmentType: '',
      financialGoals: [],
      companySize: '',
      timeframe: ''
    });
    setShowResults(false);
  };

  if (currentStep === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Equipment Finance Advisor
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find the right financing solution for your business needs
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <DollarSign className="mx-auto h-16 w-16 text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Get Personalized Equipment Financing Recommendations
              </h2>
              <p className="text-gray-600 mb-6">
                Answer a few quick questions about your business challenges and goals. 
                We'll recommend the best financing structures for your specific situation.
              </p>
            </div>
            
            <button
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'painPoints') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              What challenges are you facing?
            </h2>
            <p className="text-gray-600">Select all that apply to your situation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {painPoints.map((point) => {
              const Icon = point.icon;
              const isSelected = selections.painPoints.includes(point.id);
              return (
                <div
                  key={point.id}
                  onClick={() => handleSelection('painPoints', point.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50 text-blue-900' 
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-5 w-5 mt-1 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-sm font-medium">{point.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={selections.painPoints.length === 0}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-2 px-6 rounded-lg inline-flex items-center"
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'equipmentType') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              What type of equipment do you need?
            </h2>
            <p className="text-gray-600">Select the category that best fits your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {equipmentTypes.map((type) => (
              <div
                key={type}
                onClick={() => handleSelection('equipmentType', type)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selections.equipmentType === type
                    ? 'border-blue-600 bg-blue-50 text-blue-900' 
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">{type}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!selections.equipmentType}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-2 px-6 rounded-lg inline-flex items-center"
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'financialGoals') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              What are your financial priorities?
            </h2>
            <p className="text-gray-600">Select all that are important to you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {financialGoals.map((goal) => {
              const isSelected = selections.financialGoals.includes(goal.id);
              return (
                <div
                  key={goal.id}
                  onClick={() => handleSelection('financialGoals', goal.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50 text-blue-900' 
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">{goal.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={selections.financialGoals.length === 0}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-2 px-6 rounded-lg inline-flex items-center"
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'companySize') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              What's your company size?
            </h2>
            <p className="text-gray-600">Select your annual revenue range</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {companySizes.map((size) => (
              <div
                key={size}
                onClick={() => handleSelection('companySize', size)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selections.companySize === size
                    ? 'border-blue-600 bg-blue-50 text-blue-900' 
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">{size}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!selections.companySize}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-2 px-6 rounded-lg inline-flex items-center"
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'timeframe') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              When do you need the equipment?
            </h2>
            <p className="text-gray-600">Select your timeline</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {timeframes.map((timeframe) => (
              <div
                key={timeframe}
                onClick={() => handleSelection('timeframe', timeframe)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selections.timeframe === timeframe
                    ? 'border-blue-600 bg-blue-50 text-blue-900' 
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">{timeframe}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              disabled={!selections.timeframe}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-2 px-6 rounded-lg inline-flex items-center"
            >
              Get Recommendations
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const recommendations = getRecommendations();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Your Personalized Recommendations
            </h2>
            <p className="text-gray-600">Based on your specific needs and priorities</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {rec.type}
                </h3>
                <p className="text-gray-600 mb-4">{rec.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {rec.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-500">
                    <strong>Best for:</strong> {rec.bestFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Discuss Your Options?
            </h3>
            <p className="text-gray-600 mb-4">
              As a Certified Lease & Finance Professional (CLFP), I can help you structure 
              the right financing solution for your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg inline-flex items-center justify-center">
                <Phone className="mr-2 h-4 w-4" />
                Schedule a Call
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg">
                Email These Results
              </button>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg"
            >
              Back
            </button>
            <button
              onClick={reset}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default EquipmentFinanceAdvisor;
