import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquareText, Video } from "lucide-react";
import { NavLink } from "react-router-dom";

const iconMap = {
    resume : <FileText className="w-8 h-8 text-blue-600" />,
    cover  : <MessageSquareText className="w-8 h-8 text-blue-600" />,
    mock: <Video className="w-8 h-8 text-blue-600" />,
}

const FeatureCard = (
    {title,
    description,
    icon,
    status='coming'}
) => {
    return (
        <motion.div 
            whileHover={{ scale : 1.03 }}
            transition={{ type : 'spring', stiffness : 300}}
            className="w-full max-w-sm"
        >
            <Card className='h-full'>
                <CardContent className='p-6 flex flex-col justify-between h-full space-y-4'>
                    <div className="flex items-center gap-3">
                        {iconMap[icon]}
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            {title}
                            {status === 'coming' && (
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                Coming Soon
                            </span>
                        )}
                        </h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {description}
                    </p>
                    {status === 'available' ? (
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                            <NavLink to='/templates'>Get Started →</NavLink>
                        </Button>
                        ) : (
                        <Button disabled className="bg-blue-100 text-blue-600">
                            Coming Soon
                        </Button>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default FeatureCard